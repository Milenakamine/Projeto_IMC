using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoIMC.Contexts;
using ProjetoIMC.Domains;
using ProjetoIMC.Interfaces;
using ProjetoIMC.Respositories;
using System.Runtime.Intrinsics.X86;

namespace ProjetoIMC.Controllers
{
    [Route("v1/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {


        private readonly UsuarioRespositorie _repository;

        public UsuarioController()
        {
            _repository = new UsuarioRespositorie();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var Usuario = _repository.ListarUsuario();

                if (Usuario.Count == 0)
                {
                    return NoContent();
                }

                return Ok(Usuario);

            }
            catch (Exception _e)
            {

                return BadRequest(_e.Message);
                throw;
            }
        }


        [HttpPost]
        public IActionResult Post(Usuario _usuario)
        {
            try
            {
                Usuario usuario = _repository.CadastrarUsuario(_usuario);

                return Ok(usuario);

            }
            catch (Exception _e)
            {

                return BadRequest(new
                {
                    statusCode = 400,
                    error = _e.Message,
                    data = _usuario
                });
                throw;
            }
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id,[FromBody]Usuario _usuario)
        {
            try
            {   
                Usuario usuario = _repository.EditarUsuario(id,_usuario);

                return Ok(usuario);

            }
            catch (Exception _e)
            {

                return BadRequest(new
                {
                    statusCode = 400,
                    error = _e.Message,
                    data = _usuario
                });
                throw;
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Usuario usuario = _repository.ExcluirUsuario(id);

                return Ok(usuario);

            }
            catch (Exception _e)
            {

                return BadRequest(new
                {
                    statusCode = 400,
                    error = _e.Message
                });
                throw;
            }
        }


    }
}
