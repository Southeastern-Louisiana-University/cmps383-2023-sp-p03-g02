using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Trains;

namespace SP23.P03.Web.Controllers
{
    [Route("api/trains")]
    [ApiController]
    public class TrainsController : ControllerBase
    {
        private readonly DbSet<Train> trains;
        private readonly DataContext dataContext;
        //private readonly int id;

        public TrainsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
            trains = dataContext.Set<Train>();
        }

        [HttpGet]
        public IQueryable<TrainDto> GetAllTrains()
        {
            return GetTrainDtos(trains);
        }//end GetAllTrains

        [HttpGet("{id}")]
        public ActionResult<TrainDto> GetTrainById([FromRoute] int id)
        {
            var train = trains.FirstOrDefault(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            var trainDto = new TrainDto
            {
                Id = train.Id,
                Name = train.Name,
                Status = train.Status,
                CoachCapacity = train.CoachCapacity,
                FirstClassCapacity = train.FirstClassCapacity,
                RoomletCapacity = train.RoomletCapacity,
                SleeperCapacity = train.SleeperCapacity,
            };

            return Ok(trainDto);
        }//end GetTrainById

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<TrainDto> CreateTrain(CreateTrainDto createTrainDto)
        {

            if (InvalidCreateTrainDto(createTrainDto))
            {
                return BadRequest();
            }

            var createdTrain = new Train
            {
                Name = createTrainDto.Name,
                Status = createTrainDto.Status,
                CoachCapacity = createTrainDto.CoachCapacity,
                FirstClassCapacity = createTrainDto.FirstClassCapacity,
                RoomletCapacity = createTrainDto.RoomletCapacity,
                SleeperCapacity = createTrainDto.SleeperCapacity,
            };

            trains.Add(createdTrain);
            dataContext.SaveChanges();

            var trainDto = new TrainDto {
                Id = createdTrain.Id,
                Name = createdTrain.Name,
                Status = createdTrain.Status,
                CoachCapacity = createdTrain.CoachCapacity,
                FirstClassCapacity = createdTrain.FirstClassCapacity,
                RoomletCapacity = createdTrain.RoomletCapacity,
                SleeperCapacity = createdTrain.SleeperCapacity,
            };

            return Ok(trainDto);
        }//end CreateStation

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<TrainDto> UpdateTrain([FromBody]CreateTrainDto createTrainDto,
                                                  [FromRoute] int id)
        {
            var train = trains.FirstOrDefault(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            if (InvalidCreateTrainDto(createTrainDto))
            {
                return BadRequest();
            }

            train.Name = createTrainDto.Name;
            train.Status = createTrainDto.Status;
            train.CoachCapacity = createTrainDto.CoachCapacity;
            train.FirstClassCapacity = createTrainDto.FirstClassCapacity;
            train.RoomletCapacity = createTrainDto.RoomletCapacity;
            train.SleeperCapacity = createTrainDto.SleeperCapacity;

            dataContext.SaveChanges();

            var trainDto = new TrainDto
            {
                Id = train.Id,
                Name = train.Name,
                Status = train.Status,
                CoachCapacity = train.CoachCapacity,
                FirstClassCapacity = train.FirstClassCapacity,
                RoomletCapacity = train.RoomletCapacity,
                SleeperCapacity = train.SleeperCapacity,
            };

            return Ok(trainDto);
        }//end UpdateTrain

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult DeleteTrain(int id)
        {
            var train = trains.FirstOrDefault(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            trains.Remove(train);

            dataContext.SaveChanges();

            return Ok();
        }

        private static bool InvalidCreateTrainDto(CreateTrainDto createTrainDto) =>
           createTrainDto == null
           || String.IsNullOrWhiteSpace(createTrainDto.Name)
           || String.IsNullOrWhiteSpace(createTrainDto.Status)
           || createTrainDto.CoachCapacity > 0
           || createTrainDto.FirstClassCapacity > 0
           || createTrainDto.RoomletCapacity > 0
           || createTrainDto.SleeperCapacity > 0;

        private static IQueryable<TrainDto> GetTrainDtos(IQueryable<Train> trains)
        {
            return trains
                .Select(x => new TrainDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Status = x.Status,
                    CoachCapacity = x.CoachCapacity,
                    FirstClassCapacity = x.FirstClassCapacity,
                    RoomletCapacity = x.RoomletCapacity,
                    SleeperCapacity = x.SleeperCapacity,
                });
        }//end GetTrainDtos

    }//end TrainsController
}//end namespace
