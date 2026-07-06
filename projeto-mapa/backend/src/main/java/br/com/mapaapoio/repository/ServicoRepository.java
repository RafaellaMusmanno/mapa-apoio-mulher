package br.com.mapaapoio.repository;

import br.com.mapaapoio.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

    List<Servico> findByAtivoTrue();

    List<Servico> findByCategoriaIdAndAtivoTrue(Long categoriaId);

    List<Servico> findByCidadeIgnoreCaseAndAtivoTrue(String cidade);

    @Query("SELECT s FROM Servico s WHERE s.ativo = true AND " +
           "(LOWER(s.nome) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
           " LOWER(s.descricao) LIKE LOWER(CONCAT('%', :termo, '%')))")
    List<Servico> buscarPorTermo(String termo);
}
