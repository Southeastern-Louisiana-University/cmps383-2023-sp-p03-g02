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

        trainStations.EnsureRange((entity, x) => entity.Name == x.Name,
            new TrainStation
            {
                Name = "Yazoo Station",
                Address = "100 N Water St, Yazoo City, MS 39194"
            },
            new TrainStation
            {
                Name = "Jackson Station",
                Address = "300 W Capitol St, Jackson, MS 39201"
            },
            new TrainStation
            {
                Name = "Hazlehurst Station",
                Address = "722 E Conway St, HazleHurst, MS 39083"
            },
            new TrainStation
            {
                Name = "Brookhaven Station",
                Address = "440 N Railroad Ave, Brookhaven, MS 39601"
            },
            new TrainStation
            {
                Name = "McComb Station",
                Address = "114 N Railroad Blvd, McComb, MS 39648"
            },
            new TrainStation
            {
                Name = "Hammond Station",
                Address = "404 NW Railroad Ave, Hammond, LA 70401"
            },
            new TrainStation
            {
                Name = "Slidell Station",
                Address = "1827 Front St, Slidell, LA 70458"
            },
            new TrainStation
            {
                Name = "NOLA Station",
                Address = "1001 Loyola Ave, New Orleans, LA 70113"
            },
            new TrainStation
            {
                Name = "Picayune Station",
                Address = "200 Hwy 11 S, Picayune, MS 39466"
            },
            new TrainStation
            {
                Name = "Hattiesburg Station",
                Address = "308 Newman St, Hattiesburg, MS 39401"
            },
            new TrainStation
            {
                Name = "Laurel Station",
                Address = "230 N Maple St, Laurel, MS 39440"
            },
            new TrainStation
            {
                Name = "Meridian Station",
                Address = "1901 Front St, Meridian, MS 39301"
            },
            new TrainStation
            {
                Name = "Schriever Station",
                Address = "LA-24, Schriever, LA 70395"
            },
            new TrainStation
            {
                Name = "New Iberia Station",
                Address = "402 W Washington St, New Iberia, LA 70560"
            },
            new TrainStation
            {
                Name = "Lafayette Station",
                Address = "100 Lee Ave, Lafayette, LA 70501"
            },
            new TrainStation
            {
                Name = "Lake Charles Station",
                Address = "100 Ryan St, Lake Charles, LA 70601"
            },
            new TrainStation
            {
                Name = "Beaumont Station",
                Address = "2555 W Cedar St, Beaumont, TX 77704"
            },
            new TrainStation
            {
                Name = "Houston Station",
                Address = "902 Washington Ave, Houston, TX 77002"
            },
            new TrainStation
            {
                Name = "San Antonio Station",
                Address = "350 Hoefgen Aven, San Antonio, TX 78205"
            },
            new TrainStation
            {
                Name = "San Marcos Station",
                Address = "338 S Guadelupe St, San Marcos, TX78666"
            },
            new TrainStation
            {
                Name = "Austin Station",
                Address = "250 N Lamar Blvd, Austin, TX 78703"
            },
            new TrainStation
            {
                Name = "Taylor Station",
                Address = "118 E First St, Taylor, TX 76574"
            },
            new TrainStation
            {
                Name = "Temple Station",
                Address = "315 W Ave B, Temple, TX 76501"
            },
            new TrainStation
            {
                Name = "McGregor Station",
                Address = "1 EnTrack Blvd, McGregor, TX 76657"
            },
            new TrainStation
            {
                Name = "Cleburne Station",
                Address = "206 N Border St, Cleburne, TX 76031"
            },
            new TrainStation
            {
                Name = "Fort Worth Station",
                Address = "1001 Jones St, Fort Worth, TX 76102"
            },
            new TrainStation
            {
                Name = "Dallas Station",
                Address = "400 S Houston St, Dallas, TX 75202"
            },
            new TrainStation
            {
                Name = "Mineola Station",
                Address = "115 E Front St, Mineola, TX 75773"
            },
            new TrainStation
            {
                Name = "Longview Station",
                Address = "905 E Pacific Ave, Longview, TX 75602"
            },
            new TrainStation
            {
                Name = "Marshall Station",
                Address = "800 N Washington St, Marshall, TX 75670"
            },
            new TrainStation
            {
                Name = "Texarkana Station",
                Address = "100 E Front St, Texarkana, TX 71854"
            },
            new TrainStation
            {
                Name = "Galveston Station",
                Address = "301 59th St, Galveston, TX 75692"
            },
            new TrainStation
            {
                Name = "Nacogdoches Station",
                Address = "101 Old Tyler Rd, Nacogdoches, TX 71876"
            },
            new TrainStation
            {
                Name = "Prairie View Station",
                Address = "44814 US Hwy, Prairie View, TX 77446"
            },
            new TrainStation
            {
                Name = "Bryan Station",
                Address = "3370 Texas Ave, Bryan, TX 77802"
            },
            new TrainStation
            {
                Name = "Waco Station",
                Address = "301 S 8th St, Waco, TX 76701"
            },
            new TrainStation
            {
                Name = "Mesquite Station",
                Address = "1331 Hwy 80 E, Mesquite, TX 75150"
            },
            new TrainStation
            {
                Name = "Killeen Station",
                Address = "200 E Ave, Killeen, TX 76541"
            },
            new TrainStation
            {
                Name = "Fort Hood Station",
                Address = "616 N Hood St, Fort Hood, TX 76541"
            },
            new TrainStation
            {
                Name = "Tyler Station",
                Address = "210 E Oakwood St, Tyler, TX 75702"
            },
            new TrainStation
            {
                Name = "Shreveport Station",
                Address = "1257 Murphy St, Shreveport, LA 71101"
            },
            new TrainStation
            {
                Name = "Biloxi Station",
                Address = "820 Martin Luther King Jr. Blvd, Biloxi, MS 39530"
            },
            new TrainStation
            {
                Name = "Mobile Station",
                Address = "404 N.W Railroad Ave, Mobile, AL 70401"
            },
            new TrainStation
            {
                Name = "Baton Rouge Station",
                Address = "1253 Florida Blvd, Baton Rouge, LA 70802"
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