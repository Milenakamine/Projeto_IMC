using System.ComponentModel.DataAnnotations;

namespace ProjetoIMC.Domains
{
    public class Usuario
    {
        [Key] public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public double Altura { get; set; }
        public double Peso { get; set; }
        public int Idade { get; set; }


    }
}
