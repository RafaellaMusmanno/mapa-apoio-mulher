import { useState, useEffect, useRef } from "react";

const API = "http://localhost:8080/api";

const SERVICOS_NITEROI = [
  { id: 1, nome: "DEAM – Delegacia de Atendimento à Mulher", categoria: { id: 1, nome: "Delegacia da Mulher" }, endereco: "Av. Ernani do Amaral Peixoto, 577, 3º andar", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2717-0900", funcionamento: "24 horas, todos os dias", descricao: "Delegacia especializada em atendimento a mulheres vítimas de violência doméstica e sexual.", lat: -22.8983, lng: -43.1251, whatsapp: "(21) 98596-7491" },
  { id: 2, nome: "CEAM – Centro Especializado de Atendimento à Mulher Neuza Santos", categoria: { id: 3, nome: "Centro de Referência" }, endereco: "Rua Cônsul Francisco Cruz, 49", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2719-3047", funcionamento: "Seg/Ter/Qua/Sex: 9h–17h | Qui: 9h–12h", descricao: "Acolhimento, escuta qualificada, orientação jurídica e psicológica. Sem necessidade de agendamento.", lat: -22.8996, lng: -43.1265, whatsapp: "(21) 96992-6557", email: "codimniteroi@gmail.com" },
  { id: 3, nome: "NUAM – Núcleo de Atendimento à Mulher (Plaza Shopping)", categoria: { id: 3, nome: "Centro de Referência" }, endereco: "Rua XV de Novembro, 8 – Piso G4", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2719-3047", funcionamento: "Seg–Sáb: 12h–18h", descricao: "Ponto de acolhimento discreto dentro do Plaza Shopping. Sem necessidade de agendamento.", lat: -22.8947, lng: -43.1232 },
  { id: 4, nome: "NUAM – UPA Mário Monteiro", categoria: { id: 3, nome: "Centro de Referência" }, endereco: "UPA Mário Monteiro", bairro: "Icaraí", cidade: "Niterói", estado: "RJ", telefone: "(21) 2719-3047", funcionamento: "Integrado à UPA", descricao: "Segunda unidade do NUAM, inaugurada em 2024, integrada à rede de saúde municipal.", lat: -22.9012, lng: -43.1189 },
  { id: 5, nome: "Juizado de Violência Doméstica e Familiar", categoria: { id: 4, nome: "Assistência Jurídica" }, endereco: "Av. Ernani do Amaral Peixoto, 577 – Fórum", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2716-4562", funcionamento: "Seg–Sex: 9h–17h", descricao: "Vara especializada para aplicação da Lei Maria da Penha e medidas protetivas de urgência.", lat: -22.8988, lng: -43.1248 },
  { id: 6, nome: "Defensoria Pública – Vara de Família", categoria: { id: 4, nome: "Assistência Jurídica" }, endereco: "Fórum de Niterói", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2719-2743", funcionamento: "Seg–Sex: 9h–17h", descricao: "Atendimento jurídico gratuito em questões de família e violência doméstica.", lat: -22.8991, lng: -43.1244 },
  { id: 7, nome: "SOS Mulher – Hospital Universitário Antônio Pedro (HUAP)", categoria: { id: 5, nome: "Saúde" }, endereco: "Rua Marquês do Paraná, 303", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2629-9073", funcionamento: "24 horas", descricao: "Atendimento médico especializado para casos de violência sexual. Referência regional.", lat: -22.9023, lng: -43.1207 },
  { id: 8, nome: "Policlínica de Especialidades da Mulher Malu Sampaio", categoria: { id: 5, nome: "Saúde" }, endereco: "Av. Jansen de Melo, 843", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 2621-2302", funcionamento: "Seg–Sex: horário comercial", descricao: "Unidade de saúde especializada no atendimento integral à saúde da mulher.", lat: -22.9008, lng: -43.1221 },
  { id: 9, nome: "Disque Denúncia Niterói", categoria: { id: 6, nome: "Linha de Apoio" }, endereco: "Atendimento remoto / anônimo", bairro: "–", cidade: "Niterói", estado: "RJ", telefone: "(21) 2253-1177", funcionamento: "24h exceto domingos e feriados", descricao: "Canal exclusivo de denúncia anônima de Niterói.", lat: -22.9000, lng: -43.1240, whatsapp: "(21) 99973-1177" },
  { id: 10, nome: "CODIM – Coordenadoria de Políticas e Direitos das Mulheres", categoria: { id: 3, nome: "Centro de Referência" }, endereco: "Caminho Niemeyer s/n – Memorial Roberto Silveira", bairro: "Centro", cidade: "Niterói", estado: "RJ", telefone: "(21) 98321-0548", funcionamento: "Seg–Sex: 9h–17h", descricao: "Órgão gestor de políticas públicas para mulheres de Niterói. Endereço temporário durante reforma.", lat: -22.8935, lng: -43.1275, whatsapp: "(21) 98321-0548", email: "codimniteroi@gmail.com" },
];

const CATEGORIAS = [
  { id: null, icone: "🗺️", nome: "Todos", cor: "#5C1A35" },
  { id: 1,    icone: "🚔", nome: "Delegacia da Mulher", cor: "#1A4A6B" },
  { id: 3,    icone: "🤝", nome: "Centro de Referência", cor: "#2E7D6B" },
  { id: 4,    icone: "⚖️", nome: "Assistência Jurídica", cor: "#5C1A35" },
  { id: 5,    icone: "💜", nome: "Saúde", cor: "#7B3F6E" },
  { id: 6,    icone: "📞", nome: "Linha de Apoio", cor: "#C96A7F" },
];

function corCategoria(catId) {
  return CATEGORIAS.find(c => c.id === catId)?.cor || "#5C1A35";
}

function Estrelas({ nota, interativo = false, onSelecionar }) {
  const [hover, setHover] = useState(0);
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(n => (
        <span key={n}
          style={{ cursor: interativo ? "pointer" : "default", fontSize: interativo ? 26 : 14,
            color: n <= (hover || nota) ? "#C96A7F" : "#ddd", transition: "color .15s" }}
          onMouseEnter={() => interativo && setHover(n)}
          onMouseLeave={() => interativo && setHover(0)}
          onClick={() => interativo && onSelecionar(n)}
        >★</span>
      ))}
    </span>
  );
}

function Badge({ texto, cor }) {
  const c = cor || "#5C1A35";
  return (
    <span style={{ background: c + "18", color: c, border: `1px solid ${c}40`,
      borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: .4 }}>
      {texto}
    </span>
  );
}

// Mapa usando Leaflet direto (sem react-leaflet)
function MapaNiteroi({ servicos, onSelecionarServico, servicoAtivo }) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const marcadores = useRef({});

  useEffect(() => {
    // Importa Leaflet dinamicamente
    import("leaflet").then(L => {
      // Corrige ícones padrão do Leaflet com Vite
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!leafletMap.current && mapRef.current) {
        leafletMap.current = L.map(mapRef.current, {
          center: [-22.9000, -43.1240],
          zoom: 14,
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap",
          maxZoom: 19,
        }).addTo(leafletMap.current);
      }

      // Remove marcadores antigos
      Object.values(marcadores.current).forEach(m => m.remove());
      marcadores.current = {};

      servicos.forEach(s => {
        const ativo = servicoAtivo?.id === s.id;
        const cor = corCategoria(s.categoria?.id);
        const iconeCateg = CATEGORIAS.find(c => c.id === s.categoria?.id)?.icone || "📍";

        const icon = L.divIcon({
          className: "",
          html: `<div style="
            background:${ativo ? cor : "#fff"};
            color:${ativo ? "#fff" : cor};
            border:2.5px solid ${cor};
            border-radius:50%;
            width:38px;height:38px;
            display:flex;align-items:center;justify-content:center;
            font-size:17px;
            box-shadow:0 2px 8px #0003;
            ${ativo ? "transform:scale(1.2);" : ""}
          ">${iconeCateg}</div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

        const marker = L.marker([s.lat, s.lng], { icon })
          .addTo(leafletMap.current)
          .on("click", () => onSelecionarServico(s));

        marcadores.current[s.id] = marker;
      });
    });
  }, [servicos, servicoAtivo]);

  useEffect(() => {
    if (!leafletMap.current || !servicoAtivo) return;
    import("leaflet").then(L => {
      leafletMap.current.flyTo([servicoAtivo.lat, servicoAtivo.lng], 16, { duration: 0.8 });
    });
  }, [servicoAtivo]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

function DrawerDetalhe({ servico, onFechar, onAvaliar, avaliacoes }) {
  if (!servico) return null;
  const icone = CATEGORIAS.find(c => c.id === servico.categoria?.id)?.icone || "📍";
  const cor = corCategoria(servico.categoria?.id);

  return (
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(380px, 100%)",
      background: "#F5EFE6", overflowY: "auto", padding: 24, zIndex: 200,
      boxShadow: "-4px 0 24px #0002", display: "flex", flexDirection: "column", gap: 14 }}>
      <button onClick={onFechar} style={{ alignSelf: "flex-end", background: "none", border: "none",
        fontSize: 20, cursor: "pointer", color: "#4A4E58", padding: 4 }}>✕</button>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 32, background: "#fff", borderRadius: 12, width: 52, height: 52,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          border: `2px solid ${cor}30` }}>{icone}</div>
        <div>
          <h2 style={{ margin: 0, color: "#3a1020", fontSize: 16, lineHeight: 1.3 }}>{servico.nome}</h2>
          <div style={{ marginTop: 6 }}><Badge texto={servico.categoria?.nome} cor={cor} /></div>
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 14, display: "flex",
        flexDirection: "column", gap: 10 }}>
        {[
          { label: "📍 Endereço", val: `${servico.endereco}${servico.bairro && servico.bairro !== "–" ? ` – ${servico.bairro}` : ""}` },
          { label: "📞 Telefone", val: servico.telefone },
          { label: "💬 WhatsApp", val: servico.whatsapp },
          { label: "⏱ Funcionamento", val: servico.funcionamento },
          { label: "✉️ E-mail", val: servico.email },
        ].filter(i => i.val).map(({ label, val }) => (
          <div key={label}>
            <div style={{ fontSize: 10, color: cor, fontWeight: 700, textTransform: "uppercase", letterSpacing: .5 }}>{label}</div>
            <div style={{ color: "#3a1020", fontSize: 13, lineHeight: 1.4 }}>{val}</div>
          </div>
        ))}
      </div>
      {servico.descricao && (
        <p style={{ margin: 0, color: "#4A4E58", fontSize: 13, lineHeight: 1.65,
          background: "#fff", borderRadius: 10, padding: 12 }}>{servico.descricao}</p>
      )}
      <button style={{ background: "#5C1A35", color: "#fff", border: "none", borderRadius: 10,
        padding: "11px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
        onClick={() => onAvaliar(servico)}>⭐ Avaliar este serviço</button>
      <div>
        <h4 style={{ color: "#5C1A35", margin: "0 0 10px", fontSize: 14 }}>
          Avaliações ({avaliacoes.length})
        </h4>
        {avaliacoes.length === 0
          ? <p style={{ color: "#aaa", fontSize: 12, margin: 0 }}>Nenhuma avaliação ainda. Seja a primeira!</p>
          : avaliacoes.map((av, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 12, color: "#3a1020" }}>{av.nome || "Anônima"}</span>
                <Estrelas nota={av.nota} />
              </div>
              {av.comentario && <p style={{ margin: 0, fontSize: 12, color: "#4A4E58" }}>{av.comentario}</p>}
            </div>
          ))}
      </div>
    </div>
  );
}

function ModalAvaliacao({ servico, onFechar, onSalvar }) {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [nome, setNome] = useState("");

  function enviar() {
    if (!nota) return alert("Selecione uma nota.");
    onSalvar({ servicoId: servico.id, nota, comentario, nome });
    onFechar();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#0008", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28,
        width: "min(420px, 92vw)", boxShadow: "0 20px 60px #0004" }}>
        <h3 style={{ margin: "0 0 4px", color: "#5C1A35" }}>Avaliar serviço</h3>
        <p style={{ margin: "0 0 18px", color: "#4A4E58", fontSize: 13 }}>{servico.nome}</p>
        <label style={lbl}>Seu nome (opcional)</label>
        <input style={inp} value={nome} onChange={e => setNome(e.target.value)} placeholder="Como prefere ser identificada?" />
        <label style={lbl}>Nota *</label>
        <div style={{ marginBottom: 16 }}>
          <Estrelas nota={nota} interativo onSelecionar={setNota} />
          <span style={{ marginLeft: 8, fontSize: 13, color: "#4A4E58" }}>
            {["","Ruim","Regular","Bom","Muito bom","Excelente"][nota]}
          </span>
        </div>
        <label style={lbl}>Comentário</label>
        <textarea style={{ ...inp, height: 80, resize: "vertical" }}
          value={comentario} onChange={e => setComentario(e.target.value)}
          placeholder="Conte sua experiência..." />
        <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
          <button style={btnSec} onClick={onFechar}>Cancelar</button>
          <button style={btnPri} onClick={enviar}>Enviar avaliação</button>
        </div>
      </div>
    </div>
  );
}

function FormCadastro({ onSalvar, onCancelar }) {
  const [form, setForm] = useState({
    nome: "", categoriaId: 1, endereco: "", bairro: "", cidade: "Niterói",
    estado: "RJ", telefone: "", funcionamento: "", descricao: "",
    lat: -22.9000, lng: -43.1240,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function enviar() {
    if (!form.nome || !form.endereco) return alert("Preencha nome e endereço.");
    const cat = CATEGORIAS.find(c => c.id === form.categoriaId);
    onSalvar({ ...form, id: Date.now(), categoria: cat });
  }

  return (
    <div style={{ padding: "20px 16px", maxWidth: 680, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 16px #0001" }}>
        <h3 style={{ margin: "0 0 20px", color: "#5C1A35" }}>Cadastrar novo serviço</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={lbl}>Nome do serviço *</label>
            <input style={inp} value={form.nome} onChange={e => set("nome", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Categoria *</label>
            <select style={inp} value={form.categoriaId} onChange={e => set("categoriaId", Number(e.target.value))}>
              {CATEGORIAS.filter(c => c.id).map(c =>
                <option key={c.id} value={c.id}>{c.icone} {c.nome}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Telefone</label>
            <input style={inp} value={form.telefone} onChange={e => set("telefone", e.target.value)} placeholder="(21) 00000-0000" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={lbl}>Endereço *</label>
            <input style={inp} value={form.endereco} onChange={e => set("endereco", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Bairro</label>
            <input style={inp} value={form.bairro} onChange={e => set("bairro", e.target.value)} />
          </div>
          <div>
            <label style={lbl}>Funcionamento</label>
            <input style={inp} value={form.funcionamento} onChange={e => set("funcionamento", e.target.value)} placeholder="Seg–Sex 8h–17h" />
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={lbl}>Descrição</label>
            <textarea style={{ ...inp, height: 80, resize: "vertical" }}
              value={form.descricao} onChange={e => set("descricao", e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={btnSec} onClick={onCancelar}>Cancelar</button>
          <button style={btnPri} onClick={enviar}>Cadastrar serviço</button>
        </div>
      </div>
    </div>
  );
}

function CardServico({ servico, ativo, onClick }) {
  const icone = CATEGORIAS.find(c => c.id === servico.categoria?.id)?.icone || "📍";
  const cor = corCategoria(servico.categoria?.id);
  return (
    <div onClick={onClick}
      style={{ background: ativo ? "#5C1A35" : "#fff", borderRadius: 12, padding: "12px 14px",
        marginBottom: 8, cursor: "pointer", transition: "all .2s",
        border: `1.5px solid ${ativo ? "#5C1A35" : "#ecdde3"}`,
        boxShadow: ativo ? "0 4px 16px #5C1A3530" : "0 1px 6px #0001" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ fontSize: 20, background: ativo ? "#ffffff20" : "#F5EFE6",
          borderRadius: 8, width: 36, height: 36, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center" }}>{icone}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3,
            color: ativo ? "#fff" : "#3a1020", marginBottom: 3 }}>{servico.nome}</div>
          <div style={{ fontSize: 11, color: ativo ? "#ffffff90" : "#4A4E58" }}>
            {servico.bairro !== "–" ? `${servico.bairro} · ` : ""}{servico.funcionamento}
          </div>
        </div>
      </div>
    </div>
  );
}

const lbl = { display: "block", marginBottom: 4, fontSize: 11, fontWeight: 700,
  color: "#5C1A35", textTransform: "uppercase", letterSpacing: .5 };
const inp = { width: "100%", boxSizing: "border-box", border: "1.5px solid #e0d0d8",
  borderRadius: 8, padding: "9px 12px", fontSize: 13, color: "#3a1020",
  background: "#fff", outline: "none", fontFamily: "inherit" };
const btnPri = { flex: 1, background: "#5C1A35", color: "#fff", border: "none",
  borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" };
const btnSec = { background: "#f0e4eb", color: "#5C1A35", border: "none",
  borderRadius: 10, padding: "11px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" };

export default function App() {
  const [servicos, setServicos] = useState(SERVICOS_NITEROI);
  const [filtroCateg, setFiltroCateg] = useState(null);
  const [busca, setBusca] = useState("");
  const [servicoAtivo, setServicoAtivo] = useState(null);
  const [modalAvaliacao, setModalAvaliacao] = useState(null);
  const [aba, setAba] = useState("mapa");
  const [avaliacoesPorServico, setAvaliacoesPorServico] = useState({});

  useEffect(() => {
    fetch(`${API}/servicos`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length) setServicos(data); })
      .catch(() => {});
  }, []);

  const servicosFiltrados = servicos.filter(s => {
    const matchCateg = !filtroCateg || s.categoria?.id === filtroCateg;
    const matchBusca = !busca ||
      s.nome.toLowerCase().includes(busca.toLowerCase()) ||
      s.bairro?.toLowerCase().includes(busca.toLowerCase());
    return matchCateg && matchBusca;
  });

  function salvarAvaliacao(av) {
    setAvaliacoesPorServico(prev => ({
      ...prev, [av.servicoId]: [...(prev[av.servicoId] || []), av]
    }));
  }

  function salvarServico(novoServico) {
    setServicos(prev => [novoServico, ...prev]);
    setAba("mapa");
    setServicoAtivo(novoServico);
  }

  const avalicoesAtivo = servicoAtivo ? (avaliacoesPorServico[servicoAtivo.id] || []) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh",
      fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#F5EFE6" }}>

      <header style={{ background: "#5C1A35", color: "#fff", padding: "0 20px",
        display: "flex", alignItems: "center", gap: 14, height: 56, flexShrink: 0,
        boxShadow: "0 2px 12px #0004", zIndex: 300 }}>
        <span style={{ fontSize: 20 }}>💜</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: -.3 }}>Mapa de Apoio – Niterói</div>
          <div style={{ fontSize: 10, opacity: .7, letterSpacing: .8 }}>REDE DE SUPORTE À MULHER · ODS 5</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <a href="tel:180" style={{ background: "#C96A7F", color: "#fff", borderRadius: 8,
            padding: "6px 12px", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>📞 Ligue 180</a>
          <a href="https://wa.me/5521999731177" target="_blank" rel="noreferrer"
            style={{ background: "#2E7D6B", color: "#fff", borderRadius: 8,
              padding: "6px 12px", fontWeight: 700, fontSize: 12, textDecoration: "none" }}>💬 Denúncia</a>
        </div>
      </header>

      <div style={{ background: "#fff", padding: "10px 16px", flexShrink: 0,
        borderBottom: "1px solid #ecdde3", display: "flex", gap: 8,
        alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", background: "#F5EFE6", borderRadius: 24,
          overflow: "hidden", border: "1.5px solid #e0d0d8" }}>
          <input
            style={{ border: "none", background: "transparent", padding: "7px 14px",
              fontSize: 13, color: "#3a1020", outline: "none", width: 200 }}
            placeholder="🔍 Buscar serviço ou bairro..."
            value={busca} onChange={e => setBusca(e.target.value)}
          />
        </div>
        {CATEGORIAS.map(cat => (
          <button key={cat.id ?? "todos"} onClick={() => setFiltroCateg(cat.id)}
            style={{ whiteSpace: "nowrap",
              background: filtroCateg === cat.id ? "#5C1A35" : "#F5EFE6",
              color: filtroCateg === cat.id ? "#fff" : "#4A4E58",
              border: `1.5px solid ${filtroCateg === cat.id ? "#5C1A35" : "#e0d0d8"}`,
              borderRadius: 20, padding: "5px 12px", fontSize: 12,
              fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
            {cat.icone} {cat.nome}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", display: "flex", borderBottom: "2px solid #ecdde3",
        padding: "0 16px", flexShrink: 0 }}>
        {[["mapa","🗺️ Mapa"], ["lista","📋 Lista"], ["cadastro","➕ Cadastrar"]].map(([id, label]) => (
          <button key={id} onClick={() => setAba(id)}
            style={{ background: "none", border: "none",
              borderBottom: aba === id ? "3px solid #5C1A35" : "3px solid transparent",
              padding: "12px 18px", fontWeight: 700,
              color: aba === id ? "#5C1A35" : "#4A4E58",
              cursor: "pointer", fontSize: 13, marginBottom: -2 }}>
            {label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", alignSelf: "center", fontSize: 12, color: "#aaa" }}>
          {servicosFiltrados.length} serviço{servicosFiltrados.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {aba === "mapa" && (
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: 280, overflowY: "auto", padding: "12px 10px",
              background: "#F5EFE6", borderRight: "1px solid #ecdde3", flexShrink: 0 }}>
              {servicosFiltrados.length === 0
                ? <p style={{ color: "#aaa", fontSize: 13, textAlign: "center", marginTop: 24 }}>Nenhum serviço encontrado.</p>
                : servicosFiltrados.map(s => (
                  <CardServico key={s.id} servico={s}
                    ativo={servicoAtivo?.id === s.id}
                    onClick={() => setServicoAtivo(prev => prev?.id === s.id ? null : s)} />
                ))}
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <MapaNiteroi
                servicos={servicosFiltrados}
                onSelecionarServico={s => setServicoAtivo(prev => prev?.id === s.id ? null : s)}
                servicoAtivo={servicoAtivo}
              />
              {servicoAtivo && (
                <DrawerDetalhe
                  servico={servicoAtivo}
                  avaliacoes={avalicoesAtivo}
                  onFechar={() => setServicoAtivo(null)}
                  onAvaliar={s => { setServicoAtivo(null); setModalAvaliacao(s); }}
                />
              )}
            </div>
          </div>
        )}

        {aba === "lista" && (
          <div style={{ overflowY: "auto", height: "100%", padding: "16px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              {servicosFiltrados.map(s => {
                const icone = CATEGORIAS.find(c => c.id === s.categoria?.id)?.icone || "📍";
                const cor = corCategoria(s.categoria?.id);
                return (
                  <div key={s.id}
                    onClick={() => { setAba("mapa"); setServicoAtivo(s); }}
                    style={{ background: "#fff", borderRadius: 14, padding: "16px 18px",
                      marginBottom: 10, cursor: "pointer", border: "1.5px solid #ecdde3",
                      boxShadow: "0 2px 8px #0001", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px #5C1A3520"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px #0001"; e.currentTarget.style.transform = ""; }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 26, background: "#F5EFE6", borderRadius: 10,
                        width: 44, height: 44, display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0 }}>{icone}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: "#3a1020", fontSize: 14, marginBottom: 4 }}>{s.nome}</div>
                        <div style={{ fontSize: 12, color: "#4A4E58", marginBottom: 8 }}>
                          📍 {s.endereco}{s.bairro && s.bairro !== "–" ? ` – ${s.bairro}` : ""}, Niterói/RJ
                        </div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <Badge texto={s.categoria?.nome} cor={cor} />
                          {s.funcionamento && <Badge texto={`⏱ ${s.funcionamento}`} cor="#2E7D6B" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {aba === "cadastro" && (
          <div style={{ overflowY: "auto", height: "100%" }}>
            <FormCadastro onSalvar={salvarServico} onCancelar={() => setAba("mapa")} />
          </div>
        )}
      </div>

      {modalAvaliacao && (
        <ModalAvaliacao
          servico={modalAvaliacao}
          onFechar={() => setModalAvaliacao(null)}
          onSalvar={salvarAvaliacao}
        />
      )}

      <footer style={{ background: "#3a1020", color: "#C96A7F", textAlign: "center",
        padding: "12px 16px", fontSize: 12, flexShrink: 0 }}>
        💜 Mapa de Apoio à Mulher – Niterói/RJ &nbsp;|&nbsp; ODS 5 Igualdade de Gênero
        <span style={{ color: "#ffffff50", marginLeft: 12 }}>Emergência: 190 · Mulher: 180</span>
      </footer>
    </div>
  );
}

