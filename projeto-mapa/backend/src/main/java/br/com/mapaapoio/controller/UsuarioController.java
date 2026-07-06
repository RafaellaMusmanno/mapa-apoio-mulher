package br.com.mapaapoio.controller;

import br.com.mapaapoio.model.Usuario;
import br.com.mapaapoio.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService service;

    // GET /api/usuarios
    @GetMapping
    public List<Usuario> listar() {
        return service.listarTodos();
    }

    // GET /api/usuarios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    // POST /api/usuarios
    @PostMapping
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(usuario));
    }

    // PUT /api/usuarios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return ResponseEntity.ok(service.atualizar(id, usuario));
    }

    // DELETE /api/usuarios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
