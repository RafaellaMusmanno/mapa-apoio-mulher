package br.com.mapaapoio.service;

import br.com.mapaapoio.model.Usuario;
import br.com.mapaapoio.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;

    public List<Usuario> listarTodos() {
        return repo.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado: " + id));
    }

    @Transactional
    public Usuario criar(Usuario usuario) {
        if (repo.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado.");
        }
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return repo.save(usuario);
    }

    @Transactional
    public Usuario atualizar(Long id, Usuario dados) {
        Usuario existente = buscarPorId(id);
        existente.setNome(dados.getNome());
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
            existente.setSenha(passwordEncoder.encode(dados.getSenha()));
        }
        return repo.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setAtivo(false); // soft delete
        repo.save(usuario);
    }
}
