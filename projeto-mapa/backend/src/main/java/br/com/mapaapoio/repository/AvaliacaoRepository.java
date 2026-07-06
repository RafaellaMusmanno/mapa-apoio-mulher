package br.com.mapaapoio.repository;

import br.com.mapaapoio.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    List<Avaliacao> findByServicoId(Long servicoId);

    Optional<Avaliacao> findByServicoIdAndUsuarioId(Long servicoId, Long usuarioId);

    @Query("SELECT AVG(a.nota) FROM Avaliacao a WHERE a.servico.id = :servicoId")
    Double mediaNotasPorServico(Long servicoId);
}
