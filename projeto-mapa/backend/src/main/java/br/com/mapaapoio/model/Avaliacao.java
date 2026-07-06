package br.com.mapaapoio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "avaliacoes",
       uniqueConstraints = @UniqueConstraint(columnNames = {"servico_id", "usuario_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "servico_id", nullable = false)
    private Servico servico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Integer nota; // 1 a 5

    @Column(columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "data_avaliacao", nullable = false, updatable = false)
    private LocalDateTime dataAvaliacao = LocalDateTime.now();
}
