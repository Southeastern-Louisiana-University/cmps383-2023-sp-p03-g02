using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Data;
using SP23.P03.Web.Extensions;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Controllers;

[Route("api/trips")]
[ApiController]

public class TripsController : ControllerBase
{
    private readonly DbSet<Trip> trips;
    private readonly DataContext dataContext;

    public TripsController(DataContext dataContext)
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
        var tripDtos = GetTripDtos(trips.Where(x => x.Id == id)).FirstOrDefault();
        if (tripDtos == null)
        {
            return NotFound();
        }

        return Ok(tripDtos);
    }

    [HttpPost]
    //[Authorize(Roles = RoleNames.Admin)]
    public ActionResult<CreateTripDto> CreateTrip([FromBody] CreateTripDto dto)
    {
        if (InvalidCreateTripDto(dto))
        {
            return BadRequest();
        }

        var createdTrip = new Trip
        {
            TrainId = dto.TrainId,
            FromStationId = dto.FromStationId,
            ToStationId = dto.ToStationId,
            Departure = dto.Departure,
            Arrival = dto.Arrival,
            BasePrice = dto.BasePrice
        };

        trips.Add(createdTrip);
        dataContext.SaveChanges();

        var tripDto = new TripDto
        {
            Id = createdTrip.Id,
            TrainId = createdTrip.TrainId,
            FromStationId = createdTrip.FromStationId,
            ToStationId = createdTrip.ToStationId,
            Departure = createdTrip.Departure,
            Arrival = createdTrip.Arrival,
            BasePrice = createdTrip.BasePrice
        };

        return CreatedAtAction(nameof(GetTripById), new { id = tripDto.Id }, tripDto);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = RoleNames.Admin)]
    public ActionResult DeleteTrip([FromRoute] int id)
    {
        var trip = trips.FirstOrDefault(x => x.Id == id);

        if (trip == null)
        {
            return NotFound();
        }

        trips.Remove(trip);
        dataContext.SaveChanges();

        return Ok();
    }

    private bool InvalidCreateTripDto(CreateTripDto dto)
    {
        return false;
    }

    private static IQueryable<TripDto> GetTripDtos(IQueryable<Trip> trips)
    {
        return trips
            .Select(x => new TripDto
            {
                Id = x.Id,
                TrainId = x.TrainId,
                FromStationId = x.FromStationId,
                ToStationId = x.ToStationId,
                Departure = x.Departure,
                Arrival = x.Arrival,
                BasePrice = x.BasePrice
            });
    }
}
