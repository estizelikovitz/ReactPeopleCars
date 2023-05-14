using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactPeopleCars.Data
{
    public class Repository
    {
        private string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new DataContext(_connectionString);
            return context.People.Include(p=>p.Cars).ToList();
        }
        public List<Car> GetCarsByPerson(int personId)
        {
            using var context = new DataContext(_connectionString);
            return context.Cars.Where(c=>c.PersonId==personId).ToList();
        }

        public void AddPerson(Person person)
        {
            using var context = new DataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void AddCar(Car car)
        {
            using var context = new DataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
        public void DeletePerson(Person person)
        {
            using var context = new DataContext(_connectionString);
            context.People.Remove(person);
            context.SaveChanges();
        }
        public void UpdatePerson(Person person)
        {
            using var context = new DataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
        public Person GetPersonById(int id)
        {
            using var context = new DataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
        public void DeleteCars(int personId)
        {
            using var context = new DataContext(_connectionString);
            var cars=context.Cars.Where(c => c.PersonId == personId);
            context.Cars.RemoveRange(cars);
            context.SaveChanges();
        }
    }
}
