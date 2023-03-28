using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Controllers
{
    [Route("api/boardingpasses")]
    [ApiController]
    public class BoardingPassesController: ControllerBase
    {
        private readonly DbSet<BoardingPass> boardingPasses;
        private readonly DbSet<Passenger> passengers;
        private readonly DbSet<Trip> trips;
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        public BoardingPassesController(DataContext dataContext,
                                    UserManager<User> userManager)
        {
            this.dataContext = dataContext;
            boardingPasses = dataContext.Set<BoardingPass>();
            passengers = dataContext.Set<Passenger>();
            trips = dataContext.Set<Trip>();
            this.userManager = userManager;
        }

        [HttpGet("me")]
        [Authorize]
        public ActionResult<ICollection<BoardingPassDto>> GetMyBoardingPasses()
        {
            var myId = User.GetCurrentUserId();
            if (myId == null)
            {
                return Unauthorized("Your user could not be identified.");
            }

            var myBoardingPasses = GetBoardingPassDtos(boardingPasses.Where(x => x.OwnerId == myId)).ToList();

            return Ok(myBoardingPasses);
        }

        [HttpGet("ownedBy/{userId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<ICollection<BoardingPassDto>> GetBoardingPassesOwnedByUser([FromRoute] int userId)
        {
            if (!dataContext.Users.Any(x => x.Id == userId))
            {
                return NotFound();
            }

            var ownedBoardingPasses = GetBoardingPassDtos(boardingPasses.Where(x => x.OwnerId == userId)).ToList();

            return Ok(ownedBoardingPasses);
        }

        [HttpGet("code/{code}")]
        [Authorize]
        public ActionResult<BoardingPassDto> GetBoardingPassByCode([FromRoute] string code)
        {
            var boardingPassDto = GetBoardingPassDtos(boardingPasses.Where(x => x.Code == code)).FirstOrDefault();

            if (boardingPassDto == null)
            {
                return NotFound();
            }

            if (!(User.IsInRole(RoleNames.Admin) || boardingPassDto.OwnerId == User.GetCurrentUserId()))
            {
                return Forbid();
            }

            return Ok(boardingPassDto);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<BoardingPassDto> GetBoardingPassById([FromRoute] int id)
        {
            var boardingPassDto = GetBoardingPassDtos(boardingPasses.Where(x => x.Id == id)).FirstOrDefault();

            if (boardingPassDto == null)
            {
                return NotFound();
            }

            return Ok(boardingPassDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BoardingPassDto>> CreateBoardingPassAsync([FromBody] CreateBoardingPassDto createBoardingPassDto)
        {
            var user = await User.GetCurrentUserAsync(userManager);

            if(user == null)
            {
                return Unauthorized();
            }

            if (!(Enum.TryParse(createBoardingPassDto.TravelClass, true, out TravelClass travelClass) && Enum.IsDefined<TravelClass>(travelClass)))
            {
                return BadRequest("Invalid travel class.");
            }

            var tripIds = createBoardingPassDto.TripIds.Distinct();

            var boardingPassTrips = trips.Where(x => tripIds.Any(id => x.Id == id)).OrderBy(x => x.Departure).ToList();

            if(!boardingPassTrips.Any())
            {
                return BadRequest("No valid trips.");
            }

            // Trip error checker
            Trip? prevTrip = null;
            foreach(var trip in boardingPassTrips)
            {
                if(trip.GetRemainingCapacityForTravelClass(trips, travelClass) <= 0)
                {
                    return BadRequest("One of the trips is full.");
                }

                if(prevTrip != null)
                {
                    if(prevTrip.Arrival.CompareTo(trip.Departure) > 0)
                    {
                        return BadRequest("Trips are not in a valid order.");
                    }
                }
                prevTrip = trip;
            }

            if (!createBoardingPassDto.PassengerIds.Any())
            {
                return BadRequest();
            }

            var passengerIds = createBoardingPassDto.PassengerIds.Distinct();

            var boardingPassengers = passengers.Where(x => passengerIds.Any(id => x.Id == id));

            // Passenger error checker
            foreach (int passengerId in passengerIds)
            {
                var boardingPassenger = boardingPassengers.FirstOrDefault(x => x.Id == passengerId);

                if(boardingPassenger == null)
                {
                    return BadRequest("Invalid passenger id");
                }
                if (boardingPassenger.Owner != user)
                {
                    return BadRequest("Passenger not owned by user");
                }
            }

            var timestamp = DateTimeOffset.Now;

            string unhashedCode = $"ENTRACK_{user.NormalizedUserName}_{createBoardingPassDto.TravelClass}_{timestamp}";
            string hashedCode = BoardingPass.HashCode(unhashedCode);

            var boardingPass = new BoardingPass
            {
                Code = hashedCode,
                Owner = user,
                TravelClass = travelClass,
                Trips = boardingPassTrips.ToList(),
                Passengers = boardingPassengers.ToList(),
            };

            boardingPasses.Add(boardingPass);
            dataContext.SaveChanges();

            var boardingPassDto = GetBoardingPassDtos(boardingPasses.Where(x => x == boardingPass)).First();

            return CreatedAtAction(nameof(GetBoardingPassByCode), new { code = boardingPassDto.Code }, boardingPassDto);
        }

        [HttpPost("for/{userId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult<BoardingPassDto>> CreateBoardingPassForUserAsync([FromBody] CreateBoardingPassDto createBoardingPassDto, [FromRoute] int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return NotFound();
            }

            if (!(Enum.TryParse(createBoardingPassDto.TravelClass, true, out TravelClass travelClass) && Enum.IsDefined<TravelClass>(travelClass)))
            {
                return BadRequest("Invalid travel class.");
            }

            var tripIds = createBoardingPassDto.TripIds.Distinct();

            var boardingPassTrips = trips.Where(x => tripIds.Any(id => x.Id == id)).OrderBy(x => x.Departure).ToList();

            if (!boardingPassTrips.Any())
            {
                return BadRequest("No valid trips.");
            }

            // Trip error checker
            Trip? prevTrip = null;
            foreach (var trip in boardingPassTrips)
            {
                if (trip.GetRemainingCapacityForTravelClass(trips, travelClass) <= 0)
                {
                    return BadRequest("One of the trips is full.");
                }

                if (prevTrip != null)
                {
                    if (prevTrip.Arrival.CompareTo(trip.Departure) > 0)
                    {
                        return BadRequest("Trips are not in a valid order.");
                    }
                }
                prevTrip = trip;
            }

            if (!createBoardingPassDto.PassengerIds.Any())
            {
                return BadRequest();
            }

            var passengerIds = createBoardingPassDto.PassengerIds.Distinct();

            var boardingPassengers = passengers.Where(x => passengerIds.Any(id => x.Id == id)).ToList();

            // Passenger error checker
            foreach (int passengerId in passengerIds)
            {
                var boardingPassenger = boardingPassengers.FirstOrDefault(x => x.Id == passengerId);

                if (boardingPassenger == null)
                {
                    return BadRequest("Invalid passenger id");
                }
                if (boardingPassenger.Owner != user)
                {
                    return BadRequest("Passenger not owned by user");
                }
            }

            var timestamp = DateTimeOffset.Now;

            string unhashedCode = $"ENTRACK_{user.NormalizedUserName}_{createBoardingPassDto.TravelClass}_{timestamp}";
            string hashedCode = BoardingPass.HashCode(unhashedCode);

            var boardingPass = new BoardingPass
            {
                Code = hashedCode,
                Owner = user,
                TravelClass = travelClass,
                Trips = boardingPassTrips.ToList(),
                Passengers = boardingPassengers.ToList(),
            };

            boardingPasses.Add(boardingPass);
            dataContext.SaveChanges();

            var boardingPassDto = GetBoardingPassDtos(boardingPasses.Where(x => x == boardingPass)).First();

            return CreatedAtAction(nameof(GetBoardingPassByCode), new { code = boardingPassDto.Code }, boardingPassDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<BoardingPassDto> UpdateBoardingPass([FromBody] CreateBoardingPassDto createBoardingPassDto, [FromRoute] int id)
        {
            var boardingPass = boardingPasses.Include(x => x.Owner).Include(x => x.Passengers).FirstOrDefault(x => x.Id == id);

            if (boardingPass == null)
            {
                return NotFound();
            }

            var user = boardingPass.Owner;

            if (!(Enum.TryParse(createBoardingPassDto.TravelClass, true, out TravelClass travelClass) && Enum.IsDefined<TravelClass>(travelClass)))
            {
                return BadRequest("Invalid travel class.");
            }

            var tripIds = createBoardingPassDto.TripIds.Distinct();

            var boardingPassTrips = trips.Where(x => tripIds.Any(id => x.Id == id)).OrderBy(x => x.Departure);

            if (!boardingPassTrips.Any())
            {
                return BadRequest("No valid trips.");
            }

            // Trip error checker
            Trip? prevTrip = null;
            foreach (var trip in boardingPassTrips)
            {
                if (trip.GetRemainingCapacityForTravelClass(trips, travelClass) <= 0)
                {
                    return BadRequest("One of the trips is full.");
                }

                if (prevTrip != null)
                {
                    if (prevTrip.Arrival.CompareTo(trip.Departure) > 0)
                    {
                        return BadRequest("Trips are not in a valid order.");
                    }
                }
                prevTrip = trip;
            }

            if (!createBoardingPassDto.PassengerIds.Any())
            {
                return BadRequest();
            }

            var passengerIds = createBoardingPassDto.PassengerIds.Distinct();

            var boardingPassengers = passengers.Where(x => passengerIds.Any(id => x.Id == id));

            // Passenger error checker
            foreach (int passengerId in passengerIds)
            {
                var boardingPassenger = boardingPassengers.FirstOrDefault(x => x.Id == passengerId);

                if (boardingPassenger == null)
                {
                    return BadRequest("Invalid passenger id");
                }
                if (boardingPassenger.Owner != user)
                {
                    return BadRequest("Passenger not owned by user");
                }
            }

            boardingPass.TravelClass = travelClass;
            boardingPass.Trips = boardingPassTrips.ToList();
            boardingPass.Passengers = boardingPassengers.ToList();

            dataContext.SaveChanges();

            var boardingPassDto = GetBoardingPassDtos(boardingPasses.Where(x => x == boardingPass)).First();

            return Ok(boardingPassDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult DeleteBoardingPass([FromRoute] int id)
        {
            var boardingPass = boardingPasses.Include(x => x.Passengers).FirstOrDefault(x => x.Id == id);

            if (boardingPass == null)
            {
                return NotFound();
            }

            boardingPasses.Remove(boardingPass);
            dataContext.SaveChanges();

            return Ok();
        }


        private static IQueryable<BoardingPassDto> GetBoardingPassDtos(IQueryable<BoardingPass> boardingPasses) =>
            boardingPasses.Select(x => new BoardingPassDto
            {
                Id = x.Id,
                Code = x.Code,
                OwnerId = x.OwnerId,
                TravelClass = x.TravelClass.ToString(),
                Trips = x.Trips.Select(x => new TripDto
                {
                    Id = x.Id,
                    Train = new TrainDto
                    {
                        Id = x.Train.Id,
                        Name = x.Train.Name,
                        Status = x.Train.Status,
                        CoachCapacity = x.Train.CoachCapacity,
                        FirstClassCapacity = x.Train.FirstClassCapacity,
                        RoomletCapacity = x.Train.RoomletCapacity,
                        SleeperCapacity = x.Train.SleeperCapacity,
                    },
                    FromStation = new TrainStationDto
                    {
                        Id = x.FromStation.Id,
                        Name = x.FromStation.Name,
                        Address = x.FromStation.Address,
                        ManagerId = x.FromStation.ManagerId,
                    },
                    ToStation = new TrainStationDto
                    {
                        Id = x.ToStation.Id,
                        Name = x.ToStation.Name,
                        Address = x.ToStation.Address,
                        ManagerId = x.ToStation.ManagerId,
                    },
                    Departure = x.Departure,
                    Arrival = x.Arrival,
                    CoachPrice = x.CoachPrice,
                    FirstClassPrice = x.FirstClassPrice,
                    RoomletPrice = x.RoomletPrice,
                    SleeperPrice = x.SleeperPrice
                }).ToList(),
                Passengers = x.Passengers.Select(x => new PassengerDto
                {
                    Id = x.Id,
                    OwnerId = x.OwnerId,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    Birthday = x.Birthday,
                    Age = x.Age,
                    AgeGroup = x.AgeGroup,
                }).ToList(),
            });
    }
}
