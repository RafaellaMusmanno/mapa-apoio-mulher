package br.com.mapaapoio.service;

import br.com.mapaapoio.model.Avaliacao;
import br.com.mapaapoio.model.Servico;
import br.com.mapaapoio.model.Usuario;
import br.com.mapaapoio.repository.AvaliacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository repo;
    private final ServicoService servicoService;
    private final UsuarioService usuarioService;

    public List<Avaliacao> listarPorServico(Long servicoId) {
        return repo.findByServicoId(servicoId);
    }

    public Double mediaNotaServico(Long servicoId) {
        Double media = repo.mediaNotasPorServico(servicoId);
        return media != null ? media : 0.0;
    }

    @Transactional
    public Avaliacao criar(Long servicoId, Long usuarioId, Avaliacao avaliacao) {
        if (avaliacao.getNota() < 1 || avaliacao.getNota() > 5) {
            throw new RuntimeException("Nota deve ser entre 1 e 5.");
        }
        if (repo.findByServicoIdAndUsuarioId(servicoId, usuarioId).isPresent()) {
            throw new RuntimeException("Você já avaliou este serviço.");
        }
        Servico servico = servicoService.buscarPorId(servicoId);
        Usuario usuario = usuarioService.buscarPorId(usuarioId);
        avaliacao.setServico(servico);
        avaliacao.setUsuario(usuario);
        return repo.save(avaliacao);
    }

    @Transactional
    public Avaliacao atualizar(Long id, Avaliacao dados) {
        Avaliacao existente = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Avaliação não encontrada: " + id));
        existente.setNota(dados.getNota());
        existente.setComentario(dados.getComentario());
        return repo.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        repo.deleteById(id);
    }
}
