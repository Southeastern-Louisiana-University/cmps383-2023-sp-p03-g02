﻿namespace SP23.P03.Web.Features.Trips
{
    public class TripDto
    {
        public int Id { get; set; }
        public int TrainId { get; set; }
        public int FromStationId { get; set; }
        public int ToStationId { get; set; }
        public int ToStation { get; set; }
        public DateTimeOffset Departure { get; set; }
        public DateTimeOffset Arrival { get; set; }
        public float BasePrice { get; set; }
    }
}