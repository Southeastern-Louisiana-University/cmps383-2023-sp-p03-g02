namespace SP23.P03.Web.Features.Trains
{
    public class Train
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int TotalCapacity => CoachCapacity + FirstClassCapacity + RoomletCapacity + SleeperCapacity;
        public int CoachCapacity { get; set; } = 0;
        public int FirstClassCapacity { get; set; } = 0;
        public int RoomletCapacity { get; set; } = 0;
        public int SleeperCapacity { get; set; } = 0;
    }
}
