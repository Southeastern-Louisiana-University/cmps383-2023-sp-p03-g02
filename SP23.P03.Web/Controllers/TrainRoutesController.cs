using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.TrainRoutes;
using SP23.P03.Web.Features.TrainStations;

namespace SP23.P03.Web.Controllers;


[Route("api/trainRoutes")]
[ApiController]
public class TrainRoutesController : ControllerBase
{
    private readonly DbSet<TrainRoute> trainRoutes;
    private readonly DataContext dataContext;
    public TrainRoutesController(DataContext dataContext)
    {
        this.dataContext = dataContext;
        trainRoutes = dataContext.Set<TrainRoute>();
    }

    [HttpGet]
    public ActionResult<ICollection<TrainRouteDto>> GetTrainRoutes()
    {
        return Ok(GetTrainRouteDtos(trainRoutes));
    }

    private static IQueryable<TrainRouteDto> GetTrainRouteDtos(IQueryable<TrainRoute> trainRoutes) =>
        trainRoutes.Select(x => new TrainRouteDto
        {
            DistanceMiles = x.DistanceMiles,
            EstimatedMinutes = x.EstimatedMinutes,
            GeographyMultiplier = x.GeographyMultiplier,
            StationA = new TrainStationDto
            {
                Id = x.StationA.Id,
                Name = x.StationA.Name,
                Address = x.StationA.Address,
                ManagerId = x.StationA.ManagerId,
            },
            StationB = new TrainStationDto
            {
                Id = x.StationB.Id,
                Name = x.StationB.Name,
                Address = x.StationB.Address,
                ManagerId = x.StationB.ManagerId,
            },
            CoachPrice = x.CoachPrice,
            FirstClassPrice = x.FirstClassPrice,
            RoomletPrice = x.RoomletPrice,
            SleeperPrice = x.SleeperPrice,
        });
}
