package br.com.mapaapoio.controller;

import br.com.mapaapoio.model.Avaliacao;
import br.com.mapaapoio.service.AvaliacaoService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@CrossOrigin(origins = "http://localhost:3000")
public class AvaliacaoController {

    private final AvaliacaoService service;

    public AvaliacaoController(AvaliacaoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Avaliacao> listar(@RequestParam Long servicoId) {
        return service.listarPorServico(servicoId);
    }

    @GetMapping("/media")
    public ResponseEntity<Double> media(@RequestParam Long servicoId) {
        return ResponseEntity.ok(service.mediaNotaServico(servicoId));
    }

    @PostMapping
    public ResponseEntity<Avaliacao> criar(@RequestParam Long servicoId,
                                           @RequestParam Long usuarioId,
                                           @RequestBody Avaliacao avaliacao) {
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(service.criar(servicoId, usuarioId, avaliacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizar(@PathVariable Long id, @RequestBody Avaliacao avaliacao) {
        return ResponseEntity.ok(service.atualizar(id, avaliacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
