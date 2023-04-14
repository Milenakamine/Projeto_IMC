using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProjetoIMC.Domains;

namespace ProjetoIMC.Interfaces
{
    public interface IUsuario
    {

        List<Usuario> ListarUsuario();
        Usuario CadastrarUsuario(Usuario _usuario);
        Usuario EditarUsuario(int id,Usuario _usuario);
        Usuario ExcluirUsuario(int id);

    }
}
