using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Passengers;

namespace SP23.P03.Web.Controllers
{
    [Route("api/passengers")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly DbSet<Passenger> passengers;
        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        public PassengersController(DataContext dataContext,
                                    UserManager<User> userManager)
        {
            this.dataContext = dataContext;
            passengers = dataContext.Set<Passenger>();
            this.userManager = userManager;
        }

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<PassengerDto> GetPassengerById([FromRoute] int id)
        {
            var passenger = passengers.FirstOrDefault(x => x.Id == id);

            if(passenger == null)
            {
                return NotFound();
            }

            if (!(User.IsInRole(RoleNames.Admin) || passenger.OwnerId == User.GetCurrentUserId()))
            {
                return Forbid();
            }

            var passengerDto = new PassengerDto
            {
                Id = passenger.Id,
                OwnerId = passenger.OwnerId,
                FirstName = passenger.FirstName,
                LastName = passenger.LastName,
                Birthday = passenger.Birthday,
                Age = passenger.Age,
                AgeGroup = passenger.AgeGroup
            };

            return Ok(passengerDto);
        }

        [HttpGet("me")]
        [Authorize]
        public ActionResult<ICollection<PassengerDto>> GetMyPassengers()
        {
            var myId = User.GetCurrentUserId();
            if(myId == null)
            {
                return Unauthorized("Your user could not be identified.");
            }

            // NOTE: This could be done by instead getting the User
            //       and accessing User.OwnedPassengers, but nah
            var myPassengers = passengers.Where(x => x.OwnerId == myId).Select(x => new PassengerDto
            {
                Id = x.Id,
                OwnerId = x.OwnerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Birthday = x.Birthday,
                Age = x.Age,
                AgeGroup = x.AgeGroup
            }).ToList();

            return Ok(myPassengers);
        }

        [HttpGet("ownedBy/{userId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<ICollection<PassengerDto>> GetPassengersOwnedByUser([FromRoute] int userId)
        {
            if (!dataContext.Users.Any(x => x.Id == userId))
            {
                return NotFound();
            }

            var ownedPassengers = passengers.Where(x => x.OwnerId == userId).Select(x => new PassengerDto
            {
                Id = x.Id,
                OwnerId = x.OwnerId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Birthday = x.Birthday,
                Age = x.Age,
                AgeGroup = x.AgeGroup
            }).ToList();

            return Ok(ownedPassengers);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PassengerDto>> CreatePassengerAsync([FromBody] CreatePassengerDto createPassengerDto)
        {
            var user = await User.GetCurrentUserAsync(userManager);

            if (user == null)
            {
                return Unauthorized();
            }

            if (InvalidCreatePassengerDto(createPassengerDto))
            {
                return BadRequest();
            }

            var createdPassenger = new Passenger
            {
                Owner = user,
                FirstName = createPassengerDto.FirstName,
                LastName = createPassengerDto.LastName,
                Birthday = createPassengerDto.Birthday,
            };

            passengers.Add(createdPassenger);
            dataContext.SaveChanges();

            var passengerDto = new PassengerDto
            {
                Id = createdPassenger.Id,
                OwnerId = createdPassenger.OwnerId,
                FirstName = createdPassenger.FirstName,
                LastName = createdPassenger.LastName,
                Birthday = createdPassenger.Birthday,
                Age = createdPassenger.Age,
                AgeGroup = createdPassenger.AgeGroup,
            };

            return Ok(passengerDto);
        }

        [HttpPost("for/{userId}")]
        [Authorize(Roles = RoleNames.Admin)]
        public async Task<ActionResult<PassengerDto>> CreatePassengerForAsync([FromBody] CreatePassengerDto createPassengerDto, [FromRoute] int userId)
        {
            var user = await userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return NotFound();
            }

            if (InvalidCreatePassengerDto(createPassengerDto))
            {
                return BadRequest();
            }

            var createdPassenger = new Passenger
            {
                Owner = user,
                FirstName = createPassengerDto.FirstName,
                LastName = createPassengerDto.LastName,
                Birthday = createPassengerDto.Birthday,
            };

            passengers.Add(createdPassenger);
            dataContext.SaveChanges();

            var passengerDto = new PassengerDto
            {
                Id = createdPassenger.Id,
                OwnerId = createdPassenger.OwnerId,
                FirstName = createdPassenger.FirstName,
                LastName = createdPassenger.LastName,
                Birthday = createdPassenger.Birthday,
                Age = createdPassenger.Age,
                AgeGroup = createdPassenger.AgeGroup,
            };

            return Ok(passengerDto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public ActionResult<PassengerDto> UpdatePassenger([FromBody] CreatePassengerDto createPassengerDto,
                                                          [FromRoute] int id)
        {
            var passenger = passengers.FirstOrDefault(x => x.Id == id);
            
            if (passenger == null)
            {
                return NotFound();
            }

            if (!(User.IsInRole(RoleNames.Admin) || passenger.OwnerId == User.GetCurrentUserId()))
            {
                return Forbid();
            }

            if (InvalidCreatePassengerDto(createPassengerDto))
            {
                return BadRequest();
            }

            passenger.FirstName = createPassengerDto.FirstName;
            passenger.LastName = createPassengerDto.LastName;
            passenger.Birthday = createPassengerDto.Birthday;

            dataContext.SaveChanges();

            var passengerDto = new PassengerDto
            {
                Id = passenger.Id,
                OwnerId = passenger.OwnerId,
                FirstName = passenger.FirstName,
                LastName = passenger.LastName,
                Birthday = passenger.Birthday,
                Age = passenger.Age,
                AgeGroup = passenger.AgeGroup,
            };

            return Ok(passengerDto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult DeletePassenger([FromRoute] int id)
        {
            var passenger = passengers.FirstOrDefault(x => x.Id == id);

            if(passenger == null)
            {
                return NotFound();
            }

            if (!(User.IsInRole(RoleNames.Admin) || passenger.OwnerId == User.GetCurrentUserId()))
            {
                return Forbid();
            }

            passengers.Remove(passenger);
            dataContext.SaveChanges();

            return Ok();
        }

        private static bool InvalidCreatePassengerDto(CreatePassengerDto? createPassengerDto) =>
            createPassengerDto == null
            || String.IsNullOrWhiteSpace(createPassengerDto.FirstName)
            || String.IsNullOrWhiteSpace(createPassengerDto.LastName)
            || createPassengerDto.FirstName.Length > 64
            || createPassengerDto.LastName.Length > 64
            || DateTimeOffset.Now.AddYears(-120).CompareTo(createPassengerDto.Birthday) >= 0;
    }
}
