using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProjetoIMC.Domains;

namespace ProjetoIMC.Contexts
{
    public class UsuarioContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source=.\SqlExpress; Initial Catalog= Usuario; User Id=sa; Password=sa132; TrustServerCertificate=True");
            }

             base.OnConfiguring(optionsBuilder);

        }

    }
}
