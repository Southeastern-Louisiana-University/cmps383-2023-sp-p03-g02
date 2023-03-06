using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Controllers;

[Route("api/trips")]
[ApiController]

public class TripsController : ControllerBase
{
    private readonly DbSet<Trip> trips;
    private readonly DataContext dataContext;

    public TripsContoller(DataContext dataContext)
    {
        this.dataContext = dataContext;
        trips = dataContext.Set<Trip>();
    }

    [HttpGet]
    public IQueryable<TripDto> GetAllTrips()
    {
        return GetTripDtos(trips);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<TripDto> GetTripById(int id)
    {
        var result = GetTripDtos(trips.Where(x => x.Id == id)).FirstOrDefault();
        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
}
