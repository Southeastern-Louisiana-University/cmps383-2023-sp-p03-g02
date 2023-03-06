namespace SP23.P03.Web.Features.Trains
{
    public class TrainDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Capacity { get; set; }
    }

    public class CreateTrainDto 
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Capacity { get; set; }

    }
}
