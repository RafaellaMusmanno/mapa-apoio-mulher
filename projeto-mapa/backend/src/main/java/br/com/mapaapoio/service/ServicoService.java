package br.com.mapaapoio.service;

import br.com.mapaapoio.model.Servico;
import br.com.mapaapoio.repository.ServicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicoService {

    private final ServicoRepository repo;

    public List<Servico> listarAtivos() {
        return repo.findByAtivoTrue();
    }

    public List<Servico> listarPorCategoria(Long categoriaId) {
        return repo.findByCategoriaIdAndAtivoTrue(categoriaId);
    }

    public List<Servico> buscar(String termo) {
        return repo.buscarPorTermo(termo);
    }

    public Servico buscarPorId(Long id) {
        return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Serviço não encontrado: " + id));
    }

    @Transactional
    public Servico criar(Servico servico) {
        return repo.save(servico);
    }

    @Transactional
    public Servico atualizar(Long id, Servico dados) {
        Servico existente = buscarPorId(id);
        existente.setNome(dados.getNome());
        existente.setDescricao(dados.getDescricao());
        existente.setEndereco(dados.getEndereco());
        existente.setCidade(dados.getCidade());
        existente.setEstado(dados.getEstado());
        existente.setCep(dados.getCep());
        existente.setTelefone(dados.getTelefone());
        existente.setEmail(dados.getEmail());
        existente.setSite(dados.getSite());
        existente.setLatitude(dados.getLatitude());
        existente.setLongitude(dados.getLongitude());
        existente.setFuncionamento(dados.getFuncionamento());
        existente.setCategoria(dados.getCategoria());
        return repo.save(existente);
    }

    @Transactional
    public void deletar(Long id) {
        Servico servico = buscarPorId(id);
        servico.setAtivo(false); // soft delete
        repo.save(servico);
    }
}
