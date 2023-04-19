using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SP23.P03.Web.Features.Authorization;
using SP23.P03.Web.Features.BoardingPasses;
using SP23.P03.Web.Features.Passengers;
using SP23.P03.Web.Features.TrainRoutes;
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
        await AddTrainRoutes(dataContext);
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

        trainStations.EnsureRange((entity, x) => entity.Name == x.Name,
            new TrainStation
            {
                Name = "Yazoo Station",
                Address = "Yazoo City, MS"
            },
            new TrainStation
            {
                Name = "Jackson Station",
                Address = "Jackson, MS"
            },
            new TrainStation
            {
                Name = "Hazlehurst Station",
                Address = "Hazlehurst, MS"
            },
            new TrainStation
            {
                Name = "Brookhaven Station",
                Address = "Brookhaven, MS"
            },
            new TrainStation
            {
                Name = "McComb Station",
                Address = "McComb, MS"
            },
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
            },
            new TrainStation
            {
                Name = "Picayune Station",
                Address = "Picayune, MS"
            },
            new TrainStation
            {
                Name = "Hattiesburg Station",
                Address = "Hattiesburg, MS"
            },
            new TrainStation
            {
                Name = "Laurel Station",
                Address = "Laurel, MS"
            },
            new TrainStation
            {
                Name = "Meridian Station",
                Address = "Meridian, MS"
            },
            new TrainStation
            {
                Name = "Schriever Station",
                Address = "Schriever, LA"
            },
            new TrainStation
            {
                Name = "New Iberia Station",
                Address = "New Iberia, LA"
            },
            new TrainStation
            {
                Name = "Lafayette Station",
                Address = "Lafayette, LA"
            },
            new TrainStation
            {
                Name = "Lake Charles Station",
                Address = "Lake Charles, LA"
            },
            new TrainStation
            {
                Name = "Beaumont Station",
                Address = "Beaumont, TX"
            },
            new TrainStation
            {
                Name = "Houston Station",
                Address = "Houston, TX"
            },
            new TrainStation
            {
                Name = "San Antonio Station",
                Address = "San Antonio, TX"
            },
            new TrainStation
            {
                Name = "San Marcos Station",
                Address = "San Marcos, TX"
            },
            new TrainStation
            {
                Name = "Austin Station",
                Address = "Austin, TX"
            },
            new TrainStation
            {
                Name = "Taylor Station",
                Address = "Taylor, TX"
            },
            new TrainStation
            {
                Name = "Temple Station",
                Address = "Temple, TX"
            },
            new TrainStation
            {
                Name = "McGregor Station",
                Address = "McGregor, TX"
            },
            new TrainStation
            {
                Name = "Cleburne Station",
                Address = "Cleburne, TX"
            },
            new TrainStation
            {
                Name = "Fort Worth Station",
                Address = "Fort Worth, TX"
            },
            new TrainStation
            {
                Name = "Dallas Station",
                Address = "Dallas, TX"
            },
            new TrainStation
            {
                Name = "Mineola Station",
                Address = "Mineola, TX"
            },
            new TrainStation
            {
                Name = "Longview Station",
                Address = "Longview, TX"
            },
            new TrainStation
            {
                Name = "Marshall Station",
                Address = "Marshall, TX"
            },
            new TrainStation
            {
                Name = "Texarkana Station",
                Address = "Texarkana, TX"
            },
            new TrainStation
            {
                Name = "Galveston Station",
                Address = "Galveston, TX"
            },
            new TrainStation
            {
                Name = "Nacogdoches Station",
                Address = "Nacogdoches, TX"
            },
            new TrainStation
            {
                Name = "Prairie View Station",
                Address = "Prairie View, TX"
            },
            new TrainStation
            {
                Name = "Bryan Station",
                Address = "Bryan, TX"
            },
            new TrainStation
            {
                Name = "Waco Station",
                Address = "Waco, TX"
            },
            new TrainStation
            {
                Name = "Mesquite Station",
                Address = "Mesquite, TX"
            },
            new TrainStation
            {
                Name = "Killeen Station",
                Address = "Killeen, TX"
            },
            new TrainStation
            {
                Name = "Fort Hood Station",
                Address = "Fort Hood, TX"
            },
            new TrainStation
            {
                Name = "Tyler Station",
                Address = "Tyler, TX"
            },
            new TrainStation
            {
                Name = "Shreveport Station",
                Address = "Shreveport, LA"
            },
            new TrainStation
            {
                Name = "Biloxi Station",
                Address = "Biloxi, MS"
            },
            new TrainStation
            {
                Name = "Mobile Station",
                Address = "Mobile, AL"
            },
            new TrainStation
            {
                Name = "Baton Rouge Station",
                Address = "Baton Rouge, LA"
            }
        );

        await dataContext.SaveChangesAsync();
    }

    public static async Task AddTrainRoutes(DataContext dataContext)
    {
        var trainStations = dataContext.Set<TrainStation>();
        var d = trainStations.ToDictionary(x => x.Name);
        var trainRoutes = dataContext.Set<TrainRoute>();
        
        trainRoutes.EnsureRange((entity, x) => (entity.StationA == x.StationA && entity.StationB == x.StationB)
                                               || (entity.StationB == x.StationA && entity.StationA == x.StationB),
            new TrainRoute
            {
                StationA = d["Yazoo Station"],
                StationB = d["Jackson Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["Jackson Station"],
                StationB = d["Hazlehurst Station"],
                DistanceMiles = 40,
            },
            new TrainRoute
            {
                StationA = d["Hazlehurst Station"],
                StationB = d["Brookhaven Station"],
                DistanceMiles = 20,
            },
            new TrainRoute
            {
                StationA = d["Brookhaven Station"],
                StationB = d["McComb Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["McComb Station"],
                StationB = d["Hammond Station"],
                DistanceMiles = 60,
            },
            new TrainRoute
            {
                StationA = d["Hammond Station"],
                StationB = d["NOLA Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["NOLA Station"],
                StationB = d["Schriever Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["Schriever Station"],
                StationB = d["New Iberia Station"],
                DistanceMiles = 70,
            },
            new TrainRoute
            {
                StationA = d["New Iberia Station"],
                StationB = d["Lafayette Station"],
                DistanceMiles = 20,
            },
            new TrainRoute
            {
                StationA = d["Lafayette Station"],
                StationB = d["Lake Charles Station"],
                DistanceMiles = 70,
            },
            new TrainRoute
            {
                StationA = d["Lake Charles Station"],
                StationB = d["Beaumont Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["Beaumont Station"],
                StationB = d["Houston Station"],
                DistanceMiles = 70,
            },
            new TrainRoute
            {
                StationA = d["Houston Station"],
                StationB = d["San Antonio Station"],
                DistanceMiles = 140,
            },
            new TrainRoute
            {
                StationA = d["San Antonio Station"],
                StationB = d["San Marcos Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["San Marcos Station"],
                StationB = d["Austin Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["Austin Station"],
                StationB = d["Taylor Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["Taylor Station"],
                StationB = d["Temple Station"],
                DistanceMiles = 40,
            },
            new TrainRoute
            {
                StationA = d["Temple Station"],
                StationB = d["McGregor Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["McGregor Station"],
                StationB = d["Cleburne Station"],
                DistanceMiles = 80,
            },
            new TrainRoute
            {
                StationA = d["Cleburne Station"],
                StationB = d["Fort Worth Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["Fort Worth Station"],
                StationB = d["Dallas Station"],
                DistanceMiles = 30,
            },
            new TrainRoute
            {
                StationA = d["Dallas Station"],
                StationB = d["Mineola Station"],
                DistanceMiles = 80,
            },
            new TrainRoute
            {
                StationA = d["Mineola Station"],
                StationB = d["Longview Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["Longview Station"],
                StationB = d["Marshall Station"],
                DistanceMiles = 20,
            },
            new TrainRoute
            {
                StationA = d["Marshall Station"],
                StationB = d["Texarkana Station"],
                DistanceMiles = 60,
            },
            new TrainRoute
            {
                StationA = d["Temple Station"],
                StationB = d["Killeen Station"],
                DistanceMiles = 25,
            },
            new TrainRoute
            {
                StationA = d["Killeen Station"],
                StationB = d["Fort Hood Station"],
                DistanceMiles = 10,
            },
            new TrainRoute
            {
                StationA = d["NOLA Station"],
                StationB = d["Slidell Station"],
                DistanceMiles = 35,
            },
            new TrainRoute
            {
                StationA = d["Slidell Station"],
                StationB = d["Picayune Station"],
                DistanceMiles = 20,
            },
            new TrainRoute
            {
                StationA = d["Picayune Station"],
                StationB = d["Hattiesburg Station"],
                DistanceMiles = 80,
            },
            new TrainRoute
            {
                StationA = d["Hattiesburg Station"],
                StationB = d["Laurel Station"],
                DistanceMiles = 35,
            },
            new TrainRoute
            {
                StationA = d["Laurel Station"],
                StationB = d["Meridian Station"],
                DistanceMiles = 65,
            },
            new TrainRoute
            {
                StationA = d["Galveston Station"],
                StationB = d["Houston Station"],
                DistanceMiles = 55,
            },
            new TrainRoute
            {
                StationA = d["Houston Station"],
                StationB = d["Prairie View Station"],
                DistanceMiles = 55,
            },
            new TrainRoute
            {
                StationA = d["Prairie View Station"],
                StationB = d["Bryan Station"],
                DistanceMiles = 60,
            },
            new TrainRoute
            {
                StationA = d["Bryan Station"],
                StationB = d["Waco Station"],
                DistanceMiles = 65,
            },
            new TrainRoute
            {
                StationA = d["Waco Station"],
                StationB = d["Fort Worth Station"],
                DistanceMiles = 70,
            },
            new TrainRoute
            {
                StationA = d["Dallas Station"],
                StationB = d["Mesquite Station"],
                DistanceMiles = 10,
            },
            new TrainRoute
            {
                StationA = d["Mesquite Station"],
                StationB = d["Tyler Station"],
                DistanceMiles = 65,
            },
            new TrainRoute
            {
                StationA = d["Tyler Station"],
                StationB = d["Shreveport Station"],
                DistanceMiles = 60,
            },
            new TrainRoute
            {
                StationA = d["Shreveport Station"],
                StationB = d["Jackson Station"],
                DistanceMiles = 130,
            },
            new TrainRoute
            {
                StationA = d["Jackson Station"],
                StationB = d["Meridian Station"],
                DistanceMiles = 65,
            },
            new TrainRoute
            {
                StationA = d["Jackson Station"],
                StationB = d["Hattiesburg Station"],
                DistanceMiles = 65,
            },
            new TrainRoute
            {
                StationA = d["Hattiesburg Station"],
                StationB = d["Biloxi Station"],
                DistanceMiles = 55,
            },
            new TrainRoute
            {
                StationA = d["Biloxi Station"],
                StationB = d["Mobile Station"],
                DistanceMiles = 40,
            },
            new TrainRoute
            {
                StationA = d["Biloxi Station"],
                StationB = d["NOLA Station"],
                DistanceMiles = 50,
            },
            new TrainRoute
            {
                StationA = d["Hattiesburg Station"],
                StationB = d["NOLA Station"],
                DistanceMiles = 90,
            },
            new TrainRoute
            {
                StationA = d["NOLA Station"],
                StationB = d["Baton Rouge Station"],
                DistanceMiles = 70,
            },
            new TrainRoute
            {
                StationA = d["Houston Station"],
                StationB = d["Nacogdoches Station"],
                DistanceMiles = 125,
            },
            new TrainRoute
            {
                StationA = d["Nacogdoches Station"],
                StationB = d["Longview Station"],
                DistanceMiles = 60,
            }
        );

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
                CoachCapacity = 60,
                FirstClassCapacity = 30,
                RoomletCapacity = 10,
                SleeperCapacity = 10,
            },
            new Train
            {
                Name = "Slidell Train",
                Status = "In Use",
                CoachCapacity = 90,
                FirstClassCapacity = 30,
            },
            new Train
            {
                Name = "NOLA Train",
                Status = "Out",
                CoachCapacity = 50,
                FirstClassCapacity = 10,
                RoomletCapacity = 20,
                SleeperCapacity = 30,
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
        var slidellTrain = await trains.FirstAsync(x => x.Name == "Slidell Train");

        trips.AddRange(
            new Trip
            {
                Train = hammondTrain,
                FromStation = hammondStation,
                ToStation = slidellStation,
                Departure = new DateTimeOffset(2023, 06, 13, 13, 00, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 13, 30, 00, offset),
                CoachPrice = 8000,
                FirstClassPrice = 18000,
                RoomletPrice = 25000,
                SleeperPrice = 32000,
            },
            new Trip
            {
                Train = hammondTrain,
                FromStation = slidellStation,
                ToStation = nolaStation,
                Departure = new DateTimeOffset(2023, 06, 13, 13, 45, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 13, 55, 00, offset),
                CoachPrice = 8500,
                FirstClassPrice = 20000,
                RoomletPrice = 27000,
                SleeperPrice = 36000,
            },
            new Trip
            {
                Train = hammondTrain,
                FromStation = nolaStation,
                ToStation = hammondStation,
                Departure = new DateTimeOffset(2023, 06, 13, 14, 15, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 14, 35, 00, offset),
                CoachPrice = 7500,
                FirstClassPrice = 15000,
                RoomletPrice = 22000,
                SleeperPrice = 29000,
            },
            new Trip
            {
                Train = slidellTrain,
                FromStation = slidellStation,
                ToStation = nolaStation,
                Departure = new DateTimeOffset(2023, 06, 13, 11, 50, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 12, 00, 00, offset),
                CoachPrice = 5500,
                FirstClassPrice = 13500,
            },
            new Trip
            {
                Train = slidellTrain,
                FromStation = nolaStation,
                ToStation = hammondStation,
                Departure = new DateTimeOffset(2023, 06, 13, 12, 40, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 13, 00, 00, offset),
                CoachPrice = 6000,
                FirstClassPrice = 15000,
            },
            new Trip
            {
                Train = slidellTrain,
                FromStation = hammondStation,
                ToStation = slidellStation,
                Departure = new DateTimeOffset(2023, 06, 13, 13, 15, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 13, 45, 00, offset),
                CoachPrice = 6500,
                FirstClassPrice = 18000,
            },
            new Trip
            {
                Train = slidellTrain,
                FromStation = slidellStation,
                ToStation = nolaStation,
                Departure = new DateTimeOffset(2023, 06, 13, 14, 15, 00, offset),
                Arrival = new DateTimeOffset(2023, 06, 13, 14, 25, 00, offset),
                CoachPrice = 5500,
                FirstClassPrice = 13000,
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
        var trip3 = await trips.Skip(2).FirstAsync();

        var offset = TimeZoneInfo.Local.BaseUtcOffset;

        boardingPasses.AddRange(
            new BoardingPass
            {
                Code = BoardingPass.HashCode($"ENTRACK_{user1.NormalizedUserName}_{trip1.Id}_{new DateTimeOffset(2023, 03, 09, 0, 25, 00, offset)}"),
                Owner = user1,
                TravelClass = TravelClass.Coach,
                Trips = new List<Trip>(new Trip[] { trip1, trip2 }),
                Passengers = passengers.Where(x => x.OwnerId == user1.Id).ToList(),
            },
            new BoardingPass
            {
                Code = BoardingPass.HashCode($"ENTRACK_{user2.NormalizedUserName}_{trip2.Id}_{new DateTimeOffset(2023, 02, 22, 22, 22, 22, offset)}"),
                Owner = user2,
                TravelClass = TravelClass.FirstClass,
                Trips = new List<Trip>(new Trip[] { trip2, trip3 }),
                Passengers = passengers.Where(x => x.OwnerId == user2.Id).ToList(),
            }
        );;

        await dataContext.SaveChangesAsync();
    }

    /// <summary>
    ///     Ensures all of the given <paramref name="entities"/> exist in the <paramref name="set"/>
    ///     by calling <see cref="EnsureEntity" /> for each of them.
    /// </summary>
    /// <typeparam name="TEntity">The type of entity.</typeparam>
    /// <param name="set"></param>
    /// <param name="predicate">A function that compares an entity from the given <paramref name="entities"/> (first param) with any entity from the <paramref name="set"/> (second param),
    /// in order to ensure the existence of that entity in the <paramref name="set"/>.</param>
    /// <param name="entities">Entities that should be added to the <paramref name="set"/> if they do not already exist according to the <paramref name="predicate"/>.</param>
    private static void EnsureRange<TEntity>(this DbSet<TEntity> set, Func<TEntity, TEntity, bool> predicate, params TEntity[] entities) where TEntity : class
    {
        foreach ( var entity in entities )
        {
            EnsureEntity(set, predicate, entity);
        }
    }

    /// <summary>
    ///     Ensures a given <paramref name="entity"/> exists in the <paramref name="set"/> by first checking if
    ///     <paramref name="predicate"/>(<paramref name="entity"/>, <b>x</b>) is true for any entity <b>x</b> in the <paramref name="set"/>,
    ///     and if not, <paramref name="entity"/> is added to the <paramref name="set"/>.
    /// </summary>
    /// <typeparam name="TEntity">The type of entity.</typeparam>
    /// <param name="set"></param>
    /// <param name="predicate">A function that compares a given <paramref name="entity"/> (first param) with any entity from the <paramref name="set"/> (second param),
    /// in order to ensure the existence of the given <paramref name="entity"/> in the <paramref name="set"/>.</param>
    /// <param name="entity">An entity that should be added to the <paramref name="set"/> if it does not already exist according to the <paramref name="predicate"/>.</param>
    private static void EnsureEntity<TEntity>(this DbSet<TEntity> set, Func<TEntity, TEntity, bool> predicate, TEntity entity) where TEntity : class
    {
        if (!set.AsEnumerable().Any(x => predicate(entity, x)))
        {
            set.Add(entity);
        }
    }
}