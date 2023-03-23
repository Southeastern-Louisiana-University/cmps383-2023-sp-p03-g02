using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.Passengers;
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

            var trip = trips.FirstOrDefault(x => x.Id == createBoardingPassDto.TripId);

            if(trip == null)
            {
                return BadRequest();
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

            string unhashedCode = $"ENTRACK_{user.NormalizedUserName}_{trip.Id}_{timestamp}";
            string hashedCode = BoardingPass.HashCode(unhashedCode);

            var boardingPass = new BoardingPass
            {
                Code = hashedCode,
                Owner = user,
                Trip = trip,
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

            var trip = trips.FirstOrDefault(x => x.Id == createBoardingPassDto.TripId);

            if (trip == null)
            {
                return BadRequest();
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

            var timestamp = DateTimeOffset.Now;

            string unhashedCode = $"ENTRACK_{user.NormalizedUserName}_{trip.Id}_{timestamp}";
            string hashedCode = BoardingPass.HashCode(unhashedCode);

            var boardingPass = new BoardingPass
            {
                Code = hashedCode,
                Owner = user,
                Trip = trip,
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

            var trip = trips.FirstOrDefault(x => x.Id == createBoardingPassDto.TripId);

            if (trip == null)
            {
                return BadRequest();
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

            boardingPass.Trip = trip;
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
                Trip = new TripDto
                {
                    Id = x.Trip.Id,
                    TrainId = x.Trip.TrainId,
                    FromStation = new TrainStationDto
                    {
                        Id = x.Trip.FromStation.Id,
                        Name = x.Trip.FromStation.Name,
                        Address = x.Trip.FromStation.Address,
                        ManagerId = x.Trip.FromStation.ManagerId,
                    },
                    ToStation = new TrainStationDto
                    {
                        Id = x.Trip.ToStation.Id,
                        Name = x.Trip.ToStation.Name,
                        Address = x.Trip.ToStation.Address,
                        ManagerId = x.Trip.ToStation.ManagerId,
                    },
                    Departure = x.Trip.Departure,
                    Arrival = x.Trip.Arrival,
                    BasePrice = x.Trip.BasePrice,
                },
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
