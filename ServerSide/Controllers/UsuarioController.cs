using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerSide.Controllers;
using ServerSide.Models;
using System.Threading.Tasks;



namespace ServerSide.Controllers
{

    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly BaseDatosTestContext _context;

        public UsuarioController(BaseDatosTestContext context)
        {
            _context = context;
        }
        // POST api/usuarios
        [HttpPost]
        public ActionResult<Usuario> Post(Usuario usuario)
        {
            // Aquí va la lógica para validar y guardar el usuario en la base de datos
            // Validar que la fecha de nacimiento no sea mayor a hoy
            if (usuario.fecha_nacimiento > DateTime.Now)
            {
                return BadRequest("La fecha de nacimiento no puede ser mayor a hoy.");
            }

            // Validar que la contraseña no contenga el nombre de usuario
            if (usuario.Password.Contains(usuario.NombreUsuario))
            {
                return BadRequest("La contraseña no puede contener el nombre de usuario.");
            }

            // Validar que la contraseña tenga una longitud de 10
            if (usuario.Password.Length != 10)
            {
                return BadRequest("La contraseña debe tener una longitud de 10.");
            }

            // Aquí va la lógica para guardar el usuario en la base de datos...
            return Ok(usuario);
        }
        //
        [HttpGet("testDbConnection")]
        public async Task<ActionResult> TestDbConnection()
        {
            try
            {
                // Intenta obtener el primer perfil de la base de datos
                var firstPerfil = await _context.Perfiles.FirstOrDefaultAsync();

                if (firstPerfil == null)
                {
                    return Ok("La conexión a la base de datos se ha realizado correctamente, pero la tabla de perfiles está vacía.");
                }

                return Ok("La conexión a la base de datos se ha realizado correctamente. El primer perfil es: " + firstPerfil.nombre_perfil);
            }
            catch (Exception ex)
            {
                // Si hay un error, devuelve el mensaje de error
                return BadRequest("No se pudo conectar a la base de datos. Error: " + ex.Message);
            }
        }

        // GET api/usuarios/perfiles
        [HttpGet("perfiles")]
        public async Task<ActionResult<IEnumerable<Perfil>>> GetPerfiles()
        {
            return Ok(await _context.Perfiles.ToListAsync());
        }



        public class Usuario
        {


            // Declara las propiedades como no que admiten un valor NULL
            public int id_usuario { get; set; }
            public string NombreUsuario { get; set; }
            public string Password { get; set; }
            public Perfil Perfil { get; set; }
            public DateTime fecha_nacimiento { get; set; }
            // ...
        }

        public class Perfil
        {
            // Declara las propiedades como que no admiten un valor NULL
            public int id_perfil { get; set; }
            public string NombrePerfil { get; set; }
            public List<Usuario> Usuarios { get; set; }
            // ...
        }

    }
}
