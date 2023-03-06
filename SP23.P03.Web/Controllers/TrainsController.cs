using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
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
        [Authorize]
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
                Capacity = train.Capacity
            };

            return Ok(trainDto);
        }//end GetTrainById

        [HttpPost]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<CreateTrainDto> CreateTrain(CreateTrainDto dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest();
            }

            var train = new Train
            {
                Name = dto.Name,
                Status = dto.Status,
                Capacity = dto.Capacity
            };
            trains.Add(train);

            dataContext.SaveChanges();

            dto.Id = train.Id;

            return CreatedAtAction(nameof(GetTrainById), new { id = dto.Id }, dto);
        }//end CreateStation

        private bool IsInvalid(CreateTrainDto dto)
        {
            return string.IsNullOrWhiteSpace(dto.Name) ||
                   string.IsNullOrWhiteSpace(dto.Status) ||
                   dto.Capacity >= 150;
        }//end IsInvalid

        private static IQueryable<TrainDto> GetTrainDtos(IQueryable<Train> trains)
        {
            return trains
                .Select(x => new TrainDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Status = x.Status,
                    Capacity = x.Capacity,
                });
        }//end GetTrainDtos

    }//end TrainsController
}//end namespace
