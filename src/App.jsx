import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Facebook,
  FileText,
  FolderOpen,
  HeartHandshake,
  Instagram,
  Landmark,
  Leaf,
  MapPin,
  Menu,
  Newspaper,
  Play,
  Route,
  Share2,
  Tractor,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import './App.css';

const candidate = {
  name: 'Olavinho Boiadeiro',
  fullName: 'Olavo Francelino de Rezende',
  number: '10555',
  party: 'Republicanos',
  role: 'Deputado Estadual - Acre',
  domain: 'www.olavinhoboiadeiro.com.br',
  instagram: '@olavinho.boiadeiro',
  campaignCnpj: '68.345.467/0001-07',
  legalResponsible: 'Olavo Francelino de Rezende',
  email: 'olavinhoboiadeiro@gmail.com',
  address: 'EST AC 475, S/N, KM 28 - Zona Rural - CEP 69.945-000 - Acrelandia/AC',
};

const navItems = [
  ['Inicio', '#inicio'],
  ['Historia', '#historia'],
  ['Resultados', '#resultados'],
  ['Plano', '#plano'],
  ['Publicos', '#publicos'],
  ['Videos', '#videos'],
  ['Imprensa', '#imprensa'],
  ['Materiais', '#materiais'],
  ['Contato', '#contato'],
];

const quickStats = [
  ['CNPJ ativo', candidate.campaignCnpj, 'Identificacao oficial da campanha'],
  ['10555', 'Deputado Estadual', 'Numero e cargo destacados em toda comunicacao'],
  ['Interior', 'Prioridade', 'Acrelandia, ramais, producao e municipios'],
];

const focusStrip = [
  ['Acre que produz', <Tractor size={30} />],
  ['Ramal bom, producao andando', <Route size={30} />],
  ['Saude perto, vidas cuidadas', <HeartHandshake size={30} />],
  ['Municipios fortes, Acre mais forte', <Users size={30} />],
  ['Gestao eficiente, recurso com resultado', <BadgeCheck size={30} />],
];

const timeline = [
  ['01', 'Campo', 'Raiz no campo, convivendo com a realidade de quem produz e depende de ramal bom.'],
  ['02', 'Empreender', 'Experiencia administrando trabalho, custo, equipe, compra, venda e decisao dificil.'],
  ['03', 'Acrelandia', 'Vida publica conectada com as demandas reais do municipio e da zona rural.'],
  ['04', 'Prefeitura', 'Gestao, articulacao, obras, recursos, manutencao e cobranca por resultado.'],
  ['05', '2026', 'Uma nova missao: representar o interior produtivo como deputado estadual.'],
];

const resultCards = [
  {
    label: 'Infraestrutura urbana',
    value: '15 vias',
    note: 'Pavimentacao, manutencao e melhorias urbanas para aproximar bairros, comercio e servicos.',
    image: '/images/asfalto-portelinha.webp',
  },
  {
    label: 'Pacote urbano',
    value: '+ R$ 5,4 mi',
    note: 'Investimentos organizados para melhorar ruas, equipamentos publicos e estrutura municipal.',
    image: '/images/acrelandia-drone.webp',
  },
  {
    label: 'Ponte do Cumaru',
    value: '+ R$ 1,5 mi',
    note: 'Ligacao importante para quem mora, produz e precisa circular com mais seguranca.',
    image: '/images/ponte-cumaru.webp',
  },
  {
    label: 'Cafe e producao',
    value: '+70 mil',
    note: 'Apoio ao produtor, mecanizacao e fortalecimento de cadeias produtivas locais.',
    image: '/images/agro-plantadeira.webp',
  },
];

const mandateAxes = [
  {
    id: '01',
    title: 'Agro forte',
    icon: <Tractor size={22} />,
    text: 'Mecanizacao, cafe, pecuaria, agroindustria e apoio real ao pequeno produtor.',
    items: ['Ramal produtivo', 'Maquinas trabalhando', 'Assistencia tecnica'],
  },
  {
    id: '02',
    title: 'Infraestrutura',
    icon: <Landmark size={22} />,
    text: 'Pontes, ramais, vias urbanas e logistica para diminuir distancia entre trabalho e oportunidade.',
    items: ['Mapa de prioridades', 'Obra com fonte', 'Manutencao permanente'],
  },
  {
    id: '03',
    title: 'Saude regional',
    icon: <HeartHandshake size={22} />,
    text: 'Apoio aos municipios para atendimento mais perto, transporte sanitario e estrutura basica.',
    items: ['Unidades fortalecidas', 'Fluxo regional', 'Cuidado perto de casa'],
  },
  {
    id: '04',
    title: 'Municipios fortes',
    icon: <Users size={22} />,
    text: 'Mais capacidade para prefeituras captarem recursos, executarem obras e prestarem contas.',
    items: ['Convenios', 'Articulacao', 'Execucao'],
  },
  {
    id: '05',
    title: 'Emprego e renda',
    icon: <Leaf size={22} />,
    text: 'Ambiente melhor para empreender, qualificar, produzir e transformar materia-prima em valor local.',
    items: ['Pequeno negocio', 'Qualificacao', 'Industrializacao'],
  },
  {
    id: '06',
    title: 'Transparencia',
    icon: <ClipboardCheck size={22} />,
    text: 'Cada proposta importante deve ter meta, territorio, fonte de recurso e status publico.',
    items: ['Documento', 'Foto real', 'Prestacao de contas'],
  },
];

const accountabilityItems = [
  ['Ramal por ramal', 'Mapa de demandas, prioridades e presenca junto a quem vive na zona rural.'],
  ['Obra por obra', 'Historico de entregas com territorio, impacto e parceiros envolvidos.'],
  ['Antes e depois', 'Galeria comparativa para mostrar resultado sem exagero.'],
  ['Compromisso claro', 'Propostas apresentadas com objetivo, publico atendido e caminho de execucao.'],
  ['Parceiros presentes', 'Entrega compartilhada com reconhecimento a quem ajudou o municipio avancar.'],
  ['Acompanhamento publico', 'Agenda, plano e resultados organizados para consulta da populacao.'],
];

const mediaCards = [
  ['Entrevistas', 'Videos, podcasts e cortes oficiais com data, veiculo e tema.', <Newspaper size={28} />],
  ['Agenda na estrada', 'Registro das visitas por municipio, comunidade e setor produtivo.', <CalendarDays size={28} />],
  ['Prestacao de contas', 'Conteudo curto para redes com resultado, contexto e linguagem clara.', <ClipboardCheck size={28} />],
  ['Compartilhe 10555', 'Materiais de apoio para voluntarios, sempre revisados antes da publicacao.', <Share2 size={28} />],
];

const videoCards = [
  ['Mensagem principal', 'Olavinho fala sobre interior, producao e compromisso com os municipios.', '2:18'],
  ['Produtor rural', 'Corte curto para redes com foco em ramal, mecanizacao e escoamento.', '0:45'],
  ['Saude no interior', 'Proposta direta para atendimento regional e apoio aos municipios.', '1:04'],
];

const testimonials = [
  ['Produtor rural', 'Quem vive no ramal sabe a diferenca que faz ter alguem que entende a producao e cobra resultado.'],
  ['Empreendedora local', 'A campanha fala de trabalho, oportunidade e municipio forte. E disso que o interior precisa.'],
  ['Lideranca comunitaria', 'Olavinho conhece a realidade de perto e conversa olhando para os problemas reais.'],
];

const pressNotes = [
  ['Agenda no interior', 'Encontros com produtores, liderancas e comunidades para ouvir prioridades por regiao.'],
  ['Plano de mandato', 'Seis eixos organizam as propostas: agro, infraestrutura, saude, municipios, renda e transparencia.'],
  ['Historia de gestao', 'Acrelandia aparece como base da experiencia administrativa e do compromisso com resultados.'],
];

const galleryImages = [
  ['/images/olavinho-official-hero.png', 'Foto oficial de Olavinho Boiadeiro'],
  ['/images/olavinho-official-speaking.png', 'Olavinho Boiadeiro em fala publica'],
  ['/images/agro-plantadeira.webp', 'Equipamento agricola e producao'],
  ['/images/asfalto-portelinha.webp', 'Obra de pavimentacao'],
  ['/images/ponte-cumaru.webp', 'Ponte do Cumaru'],
  ['/images/acre-map-highlight.png', 'Mapa do Acre com Acrelandia em destaque'],
];

const agendaItems = [
  ['Acrelandia', 'Feira, produtores e liderancas locais', 'Data a confirmar'],
  ['Zona rural', 'Ramal, ponte, cafe e mecanizacao', 'Agenda aberta'],
  ['Municipios do interior', 'Escuta, propostas e articulacao regional', 'Em organizacao'],
];

const conversionActions = [
  {
    title: 'Entrar no grupo oficial',
    text: 'Receba agenda, materiais de campanha e avisos importantes direto no WhatsApp.',
    action: 'Entrar no WhatsApp',
    href: 'whatsapp',
    icon: <Users size={26} />,
  },
  {
    title: 'Ser voluntario',
    text: 'Ajude na mobilizacao, na conversa com vizinhos e na divulgacao dos materiais.',
    action: 'Quero ajudar',
    href: '#voluntario',
    icon: <HeartHandshake size={26} />,
  },
  {
    title: 'Pedir agenda',
    text: 'Convide Olavinho para encontro, reuniao, visita, comunidade, ramal ou evento.',
    action: 'Solicitar agenda',
    href: '#agenda',
    icon: <CalendarDays size={26} />,
  },
  {
    title: 'Baixar materiais',
    text: 'Acesse textos, propostas e materiais de apoio para compartilhar com seguranca.',
    action: 'Ver materiais',
    href: '#materiais',
    icon: <Download size={26} />,
  },
];

const audienceProposals = [
  {
    title: 'Produtor rural',
    icon: <Tractor size={26} />,
    image: '/images/agro-plantadeira.webp',
    points: ['Ramal trafegavel para escoar producao', 'Mecanizacao e apoio tecnico', 'Fortalecimento do cafe, pecuaria e agroindustria'],
  },
  {
    title: 'Saude perto',
    icon: <HeartHandshake size={26} />,
    image: '/images/feira-peixe.webp',
    points: ['Atendimento regional mais perto das familias', 'Apoio ao transporte sanitario', 'Estrutura basica nos municipios'],
  },
  {
    title: 'Infraestrutura',
    icon: <Landmark size={26} />,
    image: '/images/asfalto-portelinha.webp',
    points: ['Pontes, ruas e ramais com prioridade clara', 'Manutencao permanente', 'Obras com acompanhamento publico'],
  },
  {
    title: 'Juventude',
    icon: <Leaf size={26} />,
    image: '/images/acrelandia-drone.webp',
    points: ['Qualificacao para trabalho e renda', 'Esporte, tecnologia e oportunidade', 'Apoio ao primeiro emprego'],
  },
  {
    title: 'Mulheres',
    icon: <Users size={26} />,
    image: '/images/olavinho-official-speaking.png',
    points: ['Saude, protecao e autonomia economica', 'Apoio a maes e empreendedoras', 'Politicas publicas perto da realidade local'],
  },
  {
    title: 'Municipios',
    icon: <MapPin size={26} />,
    image: '/images/acre-map-highlight.png',
    points: ['Prefeituras com capacidade de captar recursos', 'Interior ouvido antes da decisao', 'Acre mais forte a partir dos municipios'],
  },
];

const materialDownloads = [
  ['Plano 10555 resumido', 'Principais eixos de trabalho para explicar a campanha em poucos minutos.', '/materiais/plano-10555.txt'],
  ['Kit do voluntario', 'Mensagem curta, orientacoes de abordagem e pontos centrais para mobilizacao.', '/materiais/kit-voluntario-10555.txt'],
  ['Propostas por publico', 'Resumo para produtor rural, saude, infraestrutura, juventude, mulheres e municipios.', '/materiais/propostas-por-publico-10555.txt'],
];

const documentCards = [
  ['Identificacao da campanha', 'Dados oficiais do candidato, partido, numero e contato.', '10555'],
  ['Plano para o Acre', 'Eixos de mandato com foco no interior, producao, saude e infraestrutura.', '6 eixos'],
  ['Resultados em Acrelandia', 'Historico de gestao apresentado com imagens, territorio e contexto.', 'Gestao'],
  ['Agenda no interior', 'Espaco para divulgar visitas, encontros, reunioes e escutas populares.', 'Agenda'],
  ['Galeria oficial', 'Fotos reais da campanha, registros de rua, campo, entrevistas e eventos.', 'Acervo'],
  ['Fale com Olavinho', 'Canal direto para mensagens, sugestoes, convites e participacao voluntaria.', 'Contato'],
];

const editableDefaults = {
  heroEyebrow: 'Olavinho Boiadeiro - Republicanos',
  heroTitleTop: 'Acre que produz.',
  heroTitleBottom: 'Interior que funciona.',
  heroLead: 'Experiencia de quem administrou, produziu e conhece de perto os desafios dos municipios acreanos. Um site oficial com historia, resultados, agenda e plano para o interior.',
  whatsappGroupUrl: '',
  storyEyebrow: 'Antes da politica, ja existia trabalho',
  storyTitle: 'Uma historia construida trabalhando.',
  storyText: 'O site assume uma arquitetura propria: hero tecnologico, narrativa clara, resultados, mapa territorial, central de documentos e chamada de mobilizacao.',
  storyQuote: 'Uma caminhada feita de trabalho, experiencia e compromisso com o Acre.',
  resultsEyebrow: 'Resultados para mostrar',
  resultsTitle: 'Trabalho que pode ser medido.',
  resultsText: 'Cada resultado importante entra com imagem, descricao e contexto para o eleitor entender o que foi feito, onde aconteceu e por que isso importa.',
  mapTitle: '22 municipios. Um so Acre.',
  mapText: 'Mapa grande do Estado do Acre com Acrelandia em destaque e pontos de atuacao para orientar a presenca da campanha no interior.',
  contactTitle: 'Fale com Olavinho.',
  contactText: 'Envie sua mensagem, proposta ou pedido de agenda. A equipe da campanha pode retornar pelos canais informados.',
};

const editorFields = [
  ['heroEyebrow', 'Chamada do hero'],
  ['heroTitleTop', 'Titulo hero - linha 1'],
  ['heroTitleBottom', 'Titulo hero - linha 2'],
  ['heroLead', 'Texto do hero'],
  ['whatsappGroupUrl', 'Link do grupo WhatsApp'],
  ['storyEyebrow', 'Chamada da historia'],
  ['storyTitle', 'Titulo da historia'],
  ['storyText', 'Texto da historia'],
  ['storyQuote', 'Frase de impacto'],
  ['resultsEyebrow', 'Chamada dos resultados'],
  ['resultsTitle', 'Titulo dos resultados'],
  ['resultsText', 'Texto dos resultados'],
  ['mapTitle', 'Titulo do mapa'],
  ['mapText', 'Texto do mapa'],
  ['contactTitle', 'Titulo do contato'],
  ['contactText', 'Texto do contato'],
];

const editorSecurity = {
  salt: 'olavinho-editor-v1',
  userHash: 'd0abccee1c05351f0aa69bc51be6e5e077b9372845528f6795479c11f8ac32fb',
  passHash: 'fa7b0ebc9039f2afe1026dd61c4bf818e6f5feed2d1e8c4ba24ab32e8e7a39ac',
  sessionKey: 'olavinho-editor-authenticated',
  lockKey: 'olavinho-editor-lock-until',
  maxAttempts: 5,
  lockMinutes: 5,
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorUnlocked, setEditorUnlocked] = useState(() => sessionStorage.getItem(editorSecurity.sessionKey) === 'true');
  const [editorCredentials, setEditorCredentials] = useState({ user: '', password: '' });
  const [editorError, setEditorError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [activeAxis, setActiveAxis] = useState(mandateAxes[0]);
  const [shareStatus, setShareStatus] = useState('');
  const [baseContent, setBaseContent] = useState(editableDefaults);
  const [editableContent, setEditableContent] = useState(() => {
    try {
      return { ...editableDefaults, ...JSON.parse(localStorage.getItem('olavinho-site-content') || '{}') };
    } catch {
      return editableDefaults;
    }
  });

  useEffect(() => {
    let active = true;

    fetch('/content.json')
      .then((response) => (response.ok ? response.json() : {}))
      .then((remoteContent) => {
        if (!active) return;
        const nextBase = { ...editableDefaults, ...remoteContent };
        const localContent = JSON.parse(localStorage.getItem('olavinho-site-content') || '{}');
        setBaseContent(nextBase);
        setEditableContent({ ...nextBase, ...localContent });
      })
      .catch(() => {
        if (active) setBaseContent(editableDefaults);
      });

    return () => {
      active = false;
    };
  }, []);

  const whatsappGroupUrl = useMemo(() => {
    const value = editableContent.whatsappGroupUrl.trim();
    if (value.startsWith('https://chat.whatsapp.com/') || value.startsWith('https://wa.me/')) {
      return value;
    }

    const text = encodeURIComponent('Ola! Quero entrar no grupo oficial do Olavinho Boiadeiro 10555.');
    return `https://wa.me/?text=${text}`;
  }, [editableContent.whatsappGroupUrl]);

  const updateEditableContent = (key, value) => {
    const next = { ...editableContent, [key]: value };
    setEditableContent(next);
    localStorage.setItem('olavinho-site-content', JSON.stringify(next));
  };

  const resetEditableContent = () => {
    setEditableContent(baseContent);
    localStorage.removeItem('olavinho-site-content');
  };

  const downloadContentJson = () => {
    const file = new Blob([`${JSON.stringify(editableContent, null, 2)}\n`], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyContentJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(editableContent, null, 2));
  };

  const hashEditorValue = async (value) => {
    const bytes = new TextEncoder().encode(`${editorSecurity.salt}${value}`);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleEditorLogin = async (event) => {
    event.preventDefault();
    const lockUntil = Number(localStorage.getItem(editorSecurity.lockKey) || 0);

    if (lockUntil > Date.now()) {
      const minutes = Math.ceil((lockUntil - Date.now()) / 60000);
      setEditorError(`Acesso bloqueado por ${minutes} min.`);
      return;
    }

    const [userHash, passHash] = await Promise.all([
      hashEditorValue(editorCredentials.user.trim()),
      hashEditorValue(editorCredentials.password),
    ]);

    if (userHash === editorSecurity.userHash && passHash === editorSecurity.passHash) {
      setEditorUnlocked(true);
      setEditorError('');
      setFailedAttempts(0);
      setEditorCredentials({ user: '', password: '' });
      sessionStorage.setItem(editorSecurity.sessionKey, 'true');
      localStorage.removeItem(editorSecurity.lockKey);
      return;
    }

    const nextAttempts = failedAttempts + 1;
    setFailedAttempts(nextAttempts);
    setEditorError('Usuario ou senha incorretos.');

    if (nextAttempts >= editorSecurity.maxAttempts) {
      localStorage.setItem(editorSecurity.lockKey, String(Date.now() + editorSecurity.lockMinutes * 60000));
      setFailedAttempts(0);
      setEditorError(`Muitas tentativas. Tente novamente em ${editorSecurity.lockMinutes} min.`);
    }
  };

  const shareCampaign = async () => {
    const shareData = {
      title: 'Olavinho Boiadeiro 10555',
      text: 'Conheca o site oficial do Olavinho Boiadeiro 10555.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus('Compartilhado');
        return;
      }

      await navigator.clipboard?.writeText(shareData.url);
      setShareStatus('Link copiado');
    } catch {
      setShareStatus('');
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteudo</a>

      <header className="topbar">
        <a className="brand brand-lockup" href="#inicio" aria-label="Pagina inicial Olavinho Boiadeiro">
          <img src="/images/olavinho-logo-principal.png" alt="Olavinho Boiadeiro Deputado Estadual" />
        </a>
        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navItems.map(([item, href]) => <a key={item} href={href}>{item}</a>)}
        </nav>
        <div className="social-links" aria-label="Redes sociais">
          <a href="https://www.instagram.com/olavinho.boiadeiro/" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#inicio" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#videos" aria-label="YouTube"><Youtube size={18} /></a>
        </div>
        <a className="nav-cta" href={whatsappGroupUrl}>Entrar no grupo</a>
        <button className="menu-button" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="menu-close" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
          {navItems.map(([item, href]) => <a key={item} href={href} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </div>
      )}

      <div className="editor-dock" aria-label="Editor do site">
        <button className="editor-toggle" type="button" onClick={() => setEditorOpen(!editorOpen)}>
          {editorOpen ? 'Fechar editor' : 'Editar site'}
        </button>
        {editorOpen && (
          <aside className="editor-panel">
            {!editorUnlocked ? (
              <form className="editor-login" onSubmit={handleEditorLogin}>
                <div>
                  <strong>Acesso restrito</strong>
                  <span>Entre para liberar o editor do site.</span>
                </div>
                <label>
                  Usuario
                  <input
                    type="text"
                    value={editorCredentials.user}
                    autoComplete="off"
                    onChange={(event) => setEditorCredentials({ ...editorCredentials, user: event.target.value })}
                  />
                </label>
                <label>
                  Senha
                  <input
                    type="password"
                    value={editorCredentials.password}
                    autoComplete="current-password"
                    onChange={(event) => setEditorCredentials({ ...editorCredentials, password: event.target.value })}
                  />
                </label>
                {editorError && <p className="editor-error">{editorError}</p>}
                <button type="submit">Entrar no editor</button>
              </form>
            ) : (
              <>
                <div>
                  <strong>Conteudo editavel</strong>
                  <span>Edite, confira no site e exporte o content.json para publicar no GitHub/Hostinger.</span>
                </div>
                {editorFields.map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <textarea value={editableContent[key]} rows={key.includes('Text') || key === 'heroLead' ? 4 : 2} onChange={(event) => updateEditableContent(key, event.target.value)} />
                  </label>
                ))}
                <div className="editor-actions">
                  <button type="button" onClick={downloadContentJson}>Baixar content.json</button>
                  <button type="button" onClick={copyContentJson}>Copiar JSON</button>
                  <button type="button" onClick={resetEditableContent}>Restaurar</button>
                </div>
              </>
            )}
          </aside>
        )}
      </div>

      <main id="conteudo">
        <section className="hero high-tech-hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-backdrop" aria-hidden="true">
            <img src="/images/acrelandia-drone.webp" alt="" />
          </div>
          <div className="tech-grid" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{editableContent.heroEyebrow}</p>
              <h1 id="hero-title">{editableContent.heroTitleTop}<span>{editableContent.heroTitleBottom}</span></h1>
              <p className="hero-lead">{editableContent.heroLead}</p>
              <div className="hero-actions">
                <a className="button primary" href="#historia">Conheca a trajetoria <ArrowRight size={18} /></a>
                <a className="button secondary" href="#plano">Ver plano 10555</a>
              </div>
              <div className="hero-identity" aria-label={`${candidate.name}, ${candidate.role}, numero ${candidate.number}`}>
                <img src="/images/olavinho-logo-principal.png" alt="Olavinho Boiadeiro Deputado Estadual" />
                <b>{candidate.number}</b>
                <small>{candidate.party}</small>
              </div>
            </div>
            <div className="hero-visual" aria-label="Painel visual da campanha">
              <div className="portrait-frame">
                <img src="/images/olavinho-official-hero.png" alt="Olavinho Boiadeiro em foto oficial de campanha" />
                <div className="portrait-badge"><span>10555</span><strong>Republicanos</strong></div>
              </div>
              <div className="signal-card signal-card-one"><span>Base</span><strong>Acrelandia</strong><small>campo, gestao e producao</small></div>
              <div className="signal-card signal-card-two"><span>Missao</span><strong>Interior forte</strong><small>resultado real</small></div>
              <div className="hero-photo-strip">
                <img src="/images/agro-plantadeira.webp" alt="Equipamento agricola em Acrelandia" />
                <img src="/images/asfalto-portelinha.webp" alt="Obra de pavimentacao" />
                <img src="/images/ponte-cumaru.webp" alt="Ponte do Cumaru" />
              </div>
            </div>
          </div>
          <div className="hero-focus-strip" aria-label="Eixos da campanha">
            {focusStrip.map(([label, icon]) => <div key={label}>{icon}<span>{label}</span></div>)}
          </div>
        </section>

        <section className="stat-ribbon" aria-label="Informacoes principais">
          {quickStats.map(([label, value, text]) => (
            <article key={label}><span>{label}</span><strong>{value}</strong><p>{text}</p></article>
          ))}
        </section>

        <section className="conversion-section" id="apoie">
          <div className="conversion-heading">
            <p className="eyebrow">Apoie a campanha</p>
            <h2>Escolha como participar agora.</h2>
            <p>O site precisa transformar interesse em apoio. Por isso, cada caminho abaixo leva a uma acao clara: grupo, voluntariado, agenda ou material.</p>
          </div>
          <div className="conversion-grid">
            {conversionActions.map((item) => {
              const href = item.href === 'whatsapp' ? whatsappGroupUrl : item.href;
              return (
                <article key={item.title}>
                  {item.icon}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={href}>{item.action} <ArrowRight size={17} /></a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="story-panel" id="historia">
          <div className="section-heading">
            <p className="eyebrow">{editableContent.storyEyebrow}</p>
            <h2>{editableContent.storyTitle}</h2>
          </div>
          <div className="story-layout">
            <div>
              <p className="story-text">{editableContent.storyText}</p>
              <blockquote>{editableContent.storyQuote}</blockquote>
            </div>
            <div className="timeline-lane" aria-label="Linha do tempo de Olavinho">
              {timeline.map(([number, title, text]) => (
                <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="proof-dashboard" id="resultados">
          <div className="section-heading">
            <p className="eyebrow">{editableContent.resultsEyebrow}</p>
            <h2>{editableContent.resultsTitle}</h2>
          </div>
          <div className="proof-layout">
            <div className="proof-copy">
              <h3>Acrelandia como prova de gestao.</h3>
              <p>{editableContent.resultsText}</p>
              <a className="inline-link" href="#arquivos"><FileText size={18} /> Ver fontes e documentos</a>
            </div>
            <div className="case-grid">
              {resultCards.map((card) => (
                <article className="case-card" key={card.label}>
                  <img src={card.image} alt="" />
                  <div><span>{card.label}</span><strong>{card.value}</strong><p>{card.note}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proposal-console" id="plano">
          <div className="console-header">
            <div><p className="eyebrow">Plano de mandato</p><h2>6 eixos. Propostas com pe no chao.</h2></div>
            <a className="button secondary" href="#arquivos"><Download size={18} /> Central de arquivos</a>
          </div>
          <div className="axis-tabs" role="tablist" aria-label="Eixos do plano">
            {mandateAxes.map((axis) => (
              <button type="button" key={axis.id} className={activeAxis.id === axis.id ? 'active' : ''} onClick={() => setActiveAxis(axis)}>
                {axis.icon}<span>Eixo {axis.id}</span><strong>{axis.title}</strong>
              </button>
            ))}
          </div>
          <div className="axis-panel">
            <div><span>{activeAxis.id}</span><h3>{activeAxis.title}</h3><p>{activeAxis.text}</p></div>
            <ul>{activeAxis.items.map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}</ul>
          </div>
        </section>

        <section className="audience-section" id="publicos">
          <div className="section-heading">
            <p className="eyebrow">Propostas por publico</p>
            <h2>Uma campanha que fala com cada realidade.</h2>
          </div>
          <div className="audience-grid">
            {audienceProposals.map((group) => (
              <article key={group.title}>
                <img src={group.image} alt="" />
                <div className="audience-card-body">
                  <span>{group.icon}{group.title}</span>
                  <ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <a href="#contato">Enviar sugestao <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="accountability-section">
          <div className="accountability-media">
            <img src="/images/references/reference-proof-2.webp" alt="Referencia visual de prestacao de contas da campanha" />
          </div>
          <div className="accountability-copy">
            <p className="eyebrow">Prestacao de contas</p>
            <h2>Resultado claro no mesmo lugar.</h2>
            <p>Inspirado no site modelo, mas sem copiar dados ficticios: aqui cada entrega tem seu espaco de verificacao.</p>
            <div className="accountability-grid">
              {accountabilityItems.map(([title, text]) => (
                <article key={title}><CheckCircle2 size={20} /><div><h3>{title}</h3><p>{text}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="map-section" id="mapa">
          <div className="map-panel">
            <div className="map-copy"><p className="eyebrow">Mapa do Acre</p><h2>{editableContent.mapTitle}</h2><p>{editableContent.mapText}</p></div>
            <div className="acre-map" role="img" aria-label="Mapa do Estado do Acre com Acrelandia em destaque">
              <img className="acre-map-image" src="/images/acre-map-highlight.png" alt="Mapa do Estado do Acre com Acrelandia em destaque" />
            </div>
          </div>
        </section>

        <section className="media-hub" id="videos">
          <div className="media-feature">
            <Play size={34} />
            <img className="media-speaker" src="/images/olavinho-official-speaking.png" alt="Olavinho Boiadeiro falando com microfone" />
            <p className="eyebrow">Videos oficiais</p>
            <h2>Mensagem em formato de campanha.</h2>
            <p>Cortes, entrevistas, bastidores e falas curtas para o eleitor entender rapido e compartilhar.</p>
          </div>
          <div className="media-grid">
            {mediaCards.map(([title, text, icon]) => <article key={title}>{icon}<h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="video-section">
          <div className="video-wall">
            {videoCards.map(([title, text, time], index) => (
              <article key={title} className={index === 0 ? 'featured-video' : ''}>
                <button type="button" aria-label={`Assistir ${title}`}><Play size={28} /></button>
                <span>{time}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-heading">
            <p className="eyebrow">Depoimentos</p>
            <h2>Vozes do interior.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map(([name, text]) => (
              <blockquote key={name}>
                <Share2 size={22} />
                <p>{text}</p>
                <cite>{name}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="press-section" id="imprensa">
          <div>
            <p className="eyebrow">Imprensa</p>
            <h2>Agenda, releases e pautas da campanha.</h2>
            <p>Area preparada para comunicados, links de entrevistas, notas oficiais e contatos de assessoria.</p>
          </div>
          <div className="press-list">
            {pressNotes.map(([title, text]) => (
              <article key={title}>
                <Newspaper size={24} />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section" id="galeria">
          <div className="section-heading">
            <p className="eyebrow">Galeria</p>
            <h2>Imagens oficiais e territorio.</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map(([src, alt]) => <img key={src} src={src} alt={alt} />)}
          </div>
        </section>

        <section className="materials-section" id="materiais">
          <div>
            <p className="eyebrow">Material para baixar</p>
            <h2>Conteudo pronto para mobilizacao.</h2>
            <p>Arquivos simples para equipe e apoiadores compartilharem a mensagem com clareza. Depois podemos trocar por PDFs oficiais diagramados.</p>
          </div>
          <div className="materials-grid">
            {materialDownloads.map(([title, text, href]) => (
              <a key={title} href={href} download>
                <Download size={24} />
                <strong>{title}</strong>
                <span>{text}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="agenda-section" id="agenda">
          <div><p className="eyebrow">Agenda Olavinho na estrada</p><h2>Presenca no municipio, no ramal e na producao.</h2></div>
          <div className="agenda-list">
            {agendaItems.map(([place, title, status]) => (
              <article key={place}><CalendarDays size={24} /><div><span>{place}</span><h3>{title}</h3><p>{status}</p></div></article>
            ))}
          </div>
        </section>

        <section className="documents-section" id="arquivos">
          <div className="documents-copy">
            <p className="eyebrow">Arquivos do candidato</p>
            <h2>Central de documentos da campanha.</h2>
            <p>Identificacao oficial, plano, agenda, materiais de campanha e canais de participacao reunidos em uma area clara.</p>
            <div className="document-grid">
              {documentCards.map(([title, text, status]) => (
                <article key={title}><FolderOpen size={22} /><div><h3>{title}</h3><p>{text}</p><span>{status}</span></div></article>
              ))}
            </div>
          </div>
          <div className="vault-card public-card">
            <img className="secondary-logo-card" src="/images/olavinho-logo-secundaria.png" alt="Olavinho Boiadeiro 10555" />
            <h3>Materiais oficiais em um so lugar</h3>
            <p>Identidade da campanha, plano, agenda, fotos e canais de contato organizados para o eleitor acompanhar Olavinho.</p>
            <a className="button secondary" href="#contato"><ArrowRight size={18} /> Falar com a campanha</a>
          </div>
        </section>

        <section className="volunteer-section" id="voluntario">
          <div><p className="eyebrow">Seja voluntario 10555</p><h2>Quem acredita no interior ajuda a mensagem chegar mais longe.</h2><p>Cadastro, grupo, agenda, sugestoes de pauta e materiais revisados para redes sociais.</p></div>
          <a className="button primary" href={whatsappGroupUrl}>Entrar no grupo <ArrowRight size={18} /></a>
        </section>

        <section className="contact-section" id="contato">
          <div><p className="eyebrow">Contato</p><h2>{editableContent.contactTitle}</h2><p>{editableContent.contactText}</p></div>
          <form className="contact-form">
            <label>Nome<input type="text" name="name" autoComplete="name" required /></label>
            <label>Municipio<input type="text" name="city" required /></label>
            <label>Telefone opcional<input type="tel" name="phone" autoComplete="tel" /></label>
            <label>Mensagem<textarea name="message" rows="4" required /></label>
            <label className="checkbox"><input type="checkbox" required /> Autorizo a equipe da campanha a responder meu contato.</label>
            <input className="honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" />
            <button className="button primary" type="submit">Enviar mensagem</button>
          </form>
        </section>

      </main>

      <div className="floating-actions">
        <button type="button" onClick={shareCampaign} aria-label="Compartilhar site da campanha">
          <Share2 size={18} /> {shareStatus || 'Compartilhar'}
        </button>
        <a className="whatsapp-float" href={whatsappGroupUrl} aria-label="Entrar no grupo do WhatsApp">Grupo WhatsApp</a>
      </div>

      <footer className="site-footer">
        <div><img className="footer-logo" src="/images/olavinho-logo-principal.png" alt="Olavinho Boiadeiro Deputado Estadual" /><span>{candidate.role} - {candidate.number}</span><span>{candidate.party}</span></div>
        <div><span>Eleicao 2026 - CNPJ: {candidate.campaignCnpj}</span><span>Responsavel: {candidate.legalResponsible}</span><span>{candidate.address}</span></div>
        <div><span>{candidate.domain}</span><span>{candidate.email}</span><span>{candidate.instagram}</span></div>
        <div><span>Propaganda eleitoral - Eleicao 2026</span><span>Material oficial da campanha Olavinho Boiadeiro 10555</span><span>Republicanos - Acre</span></div>
      </footer>
    </div>
  );
}

export default App;
