using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.Trains;
using SP23.P03.Web.Features.TrainStations;
using SP23.P03.Web.Features.Trips;

namespace SP23.P03.Web.Data;

public static class SeedHelper
{
    public static async Task MigrateAndSeed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        await dataContext.Database.MigrateAsync();

        await AddRoles(serviceProvider);
        await AddUsers(serviceProvider);

        await AddTrainStation(dataContext);
        await AddTrains(serviceProvider, dataContext);
        await AddTrips(dataContext);
        await AddPassengers(serviceProvider, dataContext);
        await AddBoardingPasses(serviceProvider, dataContext);
    }

    private static async Task AddUsers(IServiceProvider serviceProvider)
    {
        const string defaultPassword = "Password123!";
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (userManager.Users.Any())
        {
            return;
        }

        var adminUser = new User
        {
            UserName = "galkadi"
        };
        await userManager.CreateAsync(adminUser, defaultPassword);
        await userManager.AddToRoleAsync(adminUser, RoleNames.Admin);

        var bob = new User
        {
            UserName = "bob"
        };
        await userManager.CreateAsync(bob, defaultPassword);
        await userManager.AddToRoleAsync(bob, RoleNames.User);

        var sue = new User
        {
            UserName = "sue"
        };
        await userManager.CreateAsync(sue, defaultPassword);
        await userManager.AddToRoleAsync(sue, RoleNames.User);
    }

    private static async Task AddRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
        if (roleManager.Roles.Any())
        {
            return;
        }
        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.Admin
        });

        await roleManager.CreateAsync(new Role
        {
            Name = RoleNames.User
        });
    }

    private static async Task AddTrainStation(DataContext dataContext)
    {
        var trainStations = dataContext.Set<TrainStation>();

        if (await trainStations.AnyAsync())
        {
            return;
        }

        trainStations.AddRange(
            new TrainStation
            {
                Name = "Hammond Station",
                Address = "Hammond, LA"
            },
            new TrainStation
            {
                Name = "Slidell Station",
                Address = "Slidell, LA"
            },
            new TrainStation
            {
                Name = "NOLA Station",
                Address = "New Orleans, LA"
            });

        await dataContext.SaveChangesAsync();
    }

    public static async Task AddTrains(IServiceProvider serviceProvider, DataContext dataContext)
    {
        var trains = dataContext.Set<Train>();

        if (await trains.AnyAsync())
        {
            return;
        }

        trains.AddRange(
            new Train
            {
                Name = "Hammond Train",
                Status = "In Use",
                Capacity = 98
            },
            new Train
            {
                Name = "Slidell Train",
                Status = "Out",
                Capacity = 120
            },
            new Train
            {
                Name = "NOLA Train",
                Status = "Repair",
                Capacity = 111
            });

        await dataContext.SaveChangesAsync();

    }//end AddTrains()

    private static async Task AddPassengers(IServiceProvider serviceProvider, DataContext dataContext)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
        var passengers = dataContext.Set<Passenger>();

        if (await passengers.AnyAsync())
        {
            return;
        }

        var user1 = await userManager.FindByNameAsync("bob");
        var user2 = await userManager.FindByNameAsync("sue");

        if(user1 == null || user2 == null)
        {
            throw new NullReferenceException("Users required for seeding Passengers not found.");
        }

        var offset = TimeZoneInfo.Local.BaseUtcOffset;

        passengers.AddRange(
            new Passenger
            {
                Owner = user1,
                FirstName = "Bob",
                LastName = "Brown",
                Birthday = new DateTimeOffset(1980, 5, 8, 3, 39, 22, offset)
            },
            new Passenger
            {
                Owner = user1,
                FirstName = "Bob Jr.",
                LastName = "Brown",
                Birthday = new DateTimeOffset(2010, 2, 1, 7, 11, 9, offset)
            },
            new Passenger
            {
                Owner = user1,
                FirstName = "May",
                LastName = "Brown",
                Birthday = new DateTimeOffset(1982, 8, 2, 9, 2, 12, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Sue",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1980, 9, 4, 1, 37, 59, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Lisa",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(2017, 12, 24, 14, 0, 33, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Timothy",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1981, 10, 15, 18, 1, 1, offset)
            },
            new Passenger
            {
                Owner = user2,
                FirstName = "Gary",
                LastName = "Thompson",
                Birthday = new DateTimeOffset(1950, 1, 2, 0, 44, 7, offset)
            }
        );

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddTrips(DataContext dataContext)
    {
        var trips = dataContext.Set<Trip>();

        if (await trips.AnyAsync())
        {
            return;
        }

        var offset = TimeZoneInfo.Local.BaseUtcOffset;

        var stations = dataContext.Set<TrainStation>();
        var hammondStation = await stations.FirstAsync(x => x.Name == "Hammond Station");
        var slidellStation = await stations.FirstAsync(x => x.Name == "Slidell Station");
        var nolaStation = await stations.FirstAsync(x => x.Name == "NOLA Station");

        var trains = dataContext.Set<Train>();
        var hammondTrain = await trains.FirstAsync(x => x.Name == "Hammond Train");

        trips.AddRange(
            new Trip
            {
                TrainId = hammondTrain.Id,
                FromStationId = hammondStation.Id,
                ToStationId = slidellStation.Id,
                Departure = new DateTimeOffset(2023, 03, 13, 13, 00, 00, offset),
                Arrival = new DateTimeOffset(2023, 03, 13, 13, 30, 00, offset),
                BasePrice = 35
            },
            new Trip
            {
                TrainId = hammondTrain.Id,
                FromStationId = slidellStation.Id,
                ToStationId = nolaStation.Id,
                Departure = new DateTimeOffset(2023, 03, 13, 13, 45, 00, offset),
                Arrival = new DateTimeOffset(2023, 03, 13, 13, 55, 00, offset),
                BasePrice = 10
            },
            new Trip
            {
                TrainId = hammondTrain.Id,
                FromStationId = nolaStation.Id,
                ToStationId = hammondStation.Id,
                Departure = new DateTimeOffset(2023, 03, 13, 14, 15, 00, offset),
                Arrival = new DateTimeOffset(2023, 03, 13, 14, 35, 00, offset),
                BasePrice = 30
            }
        );

        await dataContext.SaveChangesAsync();
    }

    private static async Task AddBoardingPasses(IServiceProvider serviceProvider, DataContext dataContext)
    {
        var boardingPasses = dataContext.Set<BoardingPass>();
        var trips = dataContext.Set<Trip>();
        var passengers = dataContext.Set<Passenger>();

        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (await boardingPasses.AnyAsync())
        {
            return;
        }

        var user1 = await userManager.FindByNameAsync("bob");
        var user2 = await userManager.FindByNameAsync("sue");

        if (user1 == null || user2 == null)
        {
            throw new NullReferenceException("Users required for seeding Passengers not found.");
        }

        var trip1 = await trips.FirstAsync();
        var trip2 = await trips.Skip(1).FirstAsync();

        var offset = TimeZoneInfo.Local.BaseUtcOffset;

        boardingPasses.AddRange(
            new BoardingPass
            {
                Code = BoardingPass.HashCode($"ENTRACK_{user1.NormalizedUserName}_{trip1.Id}_{new DateTimeOffset(2023, 03, 09, 0, 25, 00, offset)}"),
                Owner = user1,
                Trip = trip1,
                Passengers = passengers.Where(x => x.OwnerId == user1.Id).ToList(),
            },
            new BoardingPass
            {
                Code = BoardingPass.HashCode($"ENTRACK_{user2.NormalizedUserName}_{trip2.Id}_{new DateTimeOffset(2023, 02, 22, 22, 22, 22, offset)}"),
                Owner = user2,
                Trip = trip2,
                Passengers = passengers.Where(x => x.OwnerId == user2.Id).ToList(),
            }
        );;

        await dataContext.SaveChangesAsync();
    }
}