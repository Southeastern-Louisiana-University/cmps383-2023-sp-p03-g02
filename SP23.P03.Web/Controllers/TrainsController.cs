using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;

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

        [HttpGet("{id}")]
        [Authorize]
        public ActionResult<TrainDto> GetTrainById([FromRoute] int id)
        {
            var train = trains.FirstOrDefault(x => x.Id == id);

            var trainDto = new TrainDto
            {
                Id = train.Id,
                Name = train.Name,
                Status = train.Status,
                Capacity = train.Capacity
            };

            return Ok(trainDto);
        }

    }//end TrainsController
}//end namespace
