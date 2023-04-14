using ProjetoIMC.Interfaces;
using ProjetoIMC.Domains;
using Microsoft.EntityFrameworkCore;
using ProjetoIMC.Contexts;

namespace ProjetoIMC.Respositories
{
    public class UsuarioRespositorie : IUsuario
    {


        private readonly UsuarioContext _context;

        public UsuarioRespositorie()
        {
            _context = new UsuarioContext();
        }


        public Usuario CadastrarUsuario(Usuario _usuario)
        {
                try
                {
                    _context.Usuarios.Add(_usuario);

                    _context.SaveChanges();

                    return _usuario;

                }
                catch (Exception _e)
                {

                    throw new Exception(_e.Message);
                }

        }

        public List<Usuario> ListarUsuario()
        {
            try
            {
                return _context.Usuarios.ToList();

            }
            catch (Exception _e)
            {

                throw new Exception(_e.Message);
            }
        }


        public Usuario EditarUsuario(int id,Usuario _usuario)
        {
            try
            {
                Usuario _usuarioeditado = _context.Usuarios.FirstOrDefault(user => user.IdUsuario == id);
                if (_usuarioeditado != null)
                {   _usuarioeditado.Nome = _usuario.Nome;
                    _usuarioeditado.Idade = _usuario.Idade;
                    _usuarioeditado.Altura = _usuario.Altura;
                    _usuarioeditado.Peso = _usuario.Peso;
                }
                try
                {
                    _context.Entry(_usuarioeditado).State = EntityState.Modified;
                    _context.SaveChanges();

                    return _usuario;
                }
                catch (Exception _e)
                {

                    throw new Exception(_e.Message);
                }


            }
            catch (Exception _e)
            {

                throw new Exception(_e.Message);
            }


        }


        public Usuario ExcluirUsuario(int id)
        {
            try
            {
                Usuario _usuarioexcluido = _context.Usuarios.FirstOrDefault(user => user.IdUsuario == id);


                _context.Usuarios.Remove(_usuarioexcluido);
                _context.SaveChangesAsync();

                return _usuarioexcluido;

            }
            catch (Exception _e)
            {

                throw new Exception(_e.Message);
            }


        }


    }
}
