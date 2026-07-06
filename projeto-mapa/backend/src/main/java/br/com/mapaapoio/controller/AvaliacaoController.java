package br.com.mapaapoio.controller;

import br.com.mapaapoio.model.Avaliacao;
import br.com.mapaapoio.service.AvaliacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AvaliacaoController {

    private final AvaliacaoService service;

    // GET /api/avaliacoes?servicoId=1
    @GetMapping
    public List<Avaliacao> listar(@RequestParam Long servicoId) {
        return service.listarPorServico(servicoId);
    }

    // GET /api/avaliacoes/media?servicoId=1
    @GetMapping("/media")
    public ResponseEntity<Double> media(@RequestParam Long servicoId) {
        return ResponseEntity.ok(service.mediaNotaServico(servicoId));
    }

    // POST /api/avaliacoes?servicoId=1&usuarioId=2
    @PostMapping
    public ResponseEntity<Avaliacao> criar(@RequestParam Long servicoId,
                                            @RequestParam Long usuarioId,
                                            @RequestBody Avaliacao avaliacao) {
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(service.criar(servicoId, usuarioId, avaliacao));
    }

    // PUT /api/avaliacoes/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> atualizar(@PathVariable Long id,
                                                @RequestBody Avaliacao avaliacao) {
        return ResponseEntity.ok(service.atualizar(id, avaliacao));
    }

    // DELETE /api/avaliacoes/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
