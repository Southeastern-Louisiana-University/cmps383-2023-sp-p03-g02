﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        public ActionResult<CreateTrainDto> CreateTrain(CreateTrainDto createTrainDto, int id)
        {
            var train = trains.FirstOrDefault(x => x.Id == id);

            //BadRequest if Name is bad
            //BadRequest if Capacity is Invalid
            if (InvalidCreateTrainDto(createTrainDto))
            {
                return BadRequest();
            }

            var createdTrain = new Train
            {
                Name = createTrainDto.Name,
                Status = createTrainDto.Status,
                Capacity = createTrainDto.Capacity
            };

            trains.Add(createdTrain);
            dataContext.SaveChanges();

            var trainDto = new TrainDto {
                Id = createdTrain.Id,
                Name = createdTrain.Name,
                Status = createdTrain.Status,
                Capacity = createdTrain.Capacity
            };

            return Ok(trainDto);
        }//end CreateStation

        [HttpPut("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult<TrainDto> UpdateTrain(int id, TrainDto dto)
        {
            /*
            if (IsInvalid(dto))
            {
                return BadRequest();
            }
            */

            var train = trains.FirstOrDefault(x => x.Id == id);

            if (train == null)
            {
                return NotFound();
            }

            train.Name = dto.Name;
            train.Status = dto.Status;
            train.Capacity = dto.Capacity;

            dataContext.SaveChanges();

            dto.Id = train.Id;

            return Ok(dto);
        }//end UpdateTrain

        [HttpDelete("{id}")]
        [Authorize(Roles = RoleNames.Admin)]
        public ActionResult DeleteTrain(int id, TrainDto dto)
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

        private bool InvalidCreateTrainDto(CreateTrainDto createTrainDto) =>
           createTrainDto == null
           || String.IsNullOrEmpty(createTrainDto.Name)
           || String.IsNullOrEmpty(createTrainDto.Status)
           || createTrainDto.Capacity == 0;

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
