using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleCars.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarsController : ControllerBase
    {
        private string _connectionString;

        public PeopleCarsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new Repository(_connectionString);
            return repo.GetAll();
        }

        [Route("getcarsbyperson")]
        public List<Car> GetCarsByPerson(int personId)
        {
            var repo = new Repository(_connectionString);
            return repo.GetCarsByPerson(personId);
        }

        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.AddPerson(person);
        }

        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new Repository(_connectionString);
            repo.AddCar(car);
        }

        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.DeletePerson(person);
        }

        [Route("updateperson")]
        public void UpdatePerson(Person person)
        {
            var repo = new Repository(_connectionString);
            repo.UpdatePerson(person);
        }

        [Route("getpersonbyid")]
        public Person GetPersonById(int id)
        {
            var repo = new Repository(_connectionString);
            return repo.GetPersonById(id);
        }

        [Route("deletecars")]
        public void DeleteCars(int personId)
        {
            var repo = new Repository(_connectionString);
            repo.DeleteCars(personId);
        }

    }
}
