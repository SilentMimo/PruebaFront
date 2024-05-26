namespace ServerSide.Models
{
    public class Usuario
    {
        public int id_usuario { get; set; }
        public string nombre_usuario { get; set; }
        public string password { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public DateTime fecha_creacion { get; set; }
        public int id_perfil { get; set; }
        public int activo { get; set; }
        // ...
    }

    public class Perfil
    {
        public int id_perfil { get; set; }
        public string nombre_perfil { get; set; }
    }
}
