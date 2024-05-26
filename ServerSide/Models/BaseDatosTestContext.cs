using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ServerSide.Models
{
    public class BaseDatosTestContext : DbContext
    {
        public BaseDatosTestContext(DbContextOptions<BaseDatosTestContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("USUARIO");
            modelBuilder.Entity<Perfil>().ToTable("PERFIL");
        }
    }
}
