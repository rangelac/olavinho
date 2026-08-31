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
  ShieldCheck,
  Tractor,
  Users,
  X,
  Youtube,
} from 'lucide-react';
import { useMemo, useState } from 'react';
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
  ['Agenda', '#agenda'],
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
    note: 'Ordens de servico e pavimentacao devem receber fonte e documento por obra.',
    image: '/images/asfalto-portelinha.webp',
  },
  {
    label: 'Pacote urbano',
    value: '+ R$ 5,4 mi',
    note: 'Valor citado no material visual. Publicacao definitiva exige documento/fonte.',
    image: '/images/acrelandia-drone.webp',
  },
  {
    label: 'Ponte do Cumaru',
    value: '+ R$ 1,5 mi',
    note: 'Registro visual localizado no acervo; valor deve ser conferido com convenio e fonte.',
    image: '/images/ponte-cumaru.webp',
  },
  {
    label: 'Cafe e producao',
    value: '+70 mil',
    note: 'Indicador a publicar somente com documentacao de entrega e periodo.',
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
  ['Ramal por ramal', 'Cadastro de demandas, fotos, prioridade e situacao de cada trecho.'],
  ['Obra por obra', 'Ficha com valor, origem do recurso, parceiro e andamento.'],
  ['Antes e depois', 'Galeria comparativa para mostrar resultado sem exagero.'],
  ['Documento anexado', 'Convenio, ordem de servico, empenho ou fonte oficial.'],
  ['Credito correto', 'Entrega compartilhada com atribuicao a parceiros envolvidos.'],
  ['Status publico', 'Planejada, em execucao, concluida ou pendente de validacao.'],
];

const municipalities = [
  { name: 'Acrelandia', theme: 'Producao, infraestrutura e gestao municipal como prova de experiencia.' },
  { name: 'Rio Branco', theme: 'Conexao institucional, saude regional e geracao de oportunidade.' },
  { name: 'Placido de Castro', theme: 'Fronteira produtiva, comercio e ramais com manutencao permanente.' },
  { name: 'Sena Madureira', theme: 'Integracao territorial, agricultura familiar e presenca do Estado.' },
  { name: 'Cruzeiro do Sul', theme: 'Regionalizacao da saude, educacao e economia do Jurua.' },
  { name: 'Brasileia', theme: 'Infraestrutura, comercio de fronteira e seguranca para produzir.' },
];

const mediaCards = [
  ['Entrevistas', 'Videos, podcasts e cortes oficiais com data, veiculo e tema.', <Newspaper size={28} />],
  ['Agenda na estrada', 'Registro das visitas por municipio, comunidade e setor produtivo.', <CalendarDays size={28} />],
  ['Prestacao de contas', 'Conteudo curto para redes com fonte e documento correspondente.', <ClipboardCheck size={28} />],
  ['Compartilhe 10555', 'Materiais de apoio para voluntarios, sempre revisados antes da publicacao.', <Share2 size={28} />],
];

const agendaItems = [
  ['Acrelandia', 'Feira, produtores e liderancas locais', 'Data a confirmar'],
  ['Zona rural', 'Ramal, ponte, cafe e mecanizacao', 'Agenda aberta'],
  ['Municipios do interior', 'Escuta, propostas e articulacao regional', 'Em organizacao'],
];

const documentCards = [
  ['CNPJ da campanha', 'Cadastro confirmado pelo comprovante da Receita Federal.', '68.345.467/0001-07'],
  ['Compliance eleitoral', 'Checklist de IA, propaganda, identificacao e LGPD.', 'Documento interno'],
  ['Fontes de resultados', 'Area preparada para anexar comprovantes de obras e entregas.', 'A validar'],
  ['Acervo de imagens', 'Fotos reais, referencias visuais e creditos de uso.', 'Organizar'],
  ['Plano de mandato', 'Eixos e propostas com linguagem publica revisavel.', 'Versao 1'],
  ['Politica de privacidade', 'Base para formulario, consentimento e atendimento LGPD.', 'Pendente'],
];

const sourceNotes = [
  'Acervo local auditado em D:\\OLAVINHO ACRELANDIA.',
  'Modelo HTML e artes de referencia usados como direcao visual, sem copiar dados ficticios.',
  'Regras eleitorais e internet: TSE e legislacao aplicavel a 2026 devem ser revisadas por juridico antes da publicacao final.',
];

const editableDefaults = {
  heroEyebrow: 'Olavinho Boiadeiro - Republicanos',
  heroTitleTop: 'Acre que produz.',
  heroTitleBottom: 'Interior que funciona.',
  heroLead: 'Experiencia de quem administrou, produziu e conhece de perto os desafios dos municipios acreanos. Um site oficial com prova, fonte, agenda e plano para o interior.',
  storyEyebrow: 'Antes da politica, ja existia trabalho',
  storyTitle: 'Uma historia construida trabalhando.',
  storyText: 'O site assume a mesma forca dos modelos enviados, mas com uma arquitetura propria: hero tecnologico, narrativa clara, resultados auditaveis, mapa territorial, central de documentos e chamada de mobilizacao.',
  storyQuote: 'Uma caminhada feita de trabalho, experiencia e compromisso com o Acre.',
  resultsEyebrow: 'Resultados com fonte',
  resultsTitle: 'Trabalho que pode ser medido.',
  resultsText: 'Cada resultado importante entra com imagem, descricao e status de validacao. Antes de publicar em definitivo, o numero precisa de documento, fonte e credito correto.',
  mapTitle: '22 municipios. Um so Acre.',
  mapText: 'Mapa real do Estado do Acre com pontos de atuacao e foco territorial da campanha.',
  contactTitle: 'Fale com Olavinho.',
  contactText: 'Envie sua mensagem, proposta ou pedido de agenda. Os dados devem ser tratados conforme LGPD.',
};

const editorFields = [
  ['heroEyebrow', 'Chamada do hero'],
  ['heroTitleTop', 'Titulo hero - linha 1'],
  ['heroTitleBottom', 'Titulo hero - linha 2'],
  ['heroLead', 'Texto do hero'],
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [activeMunicipality, setActiveMunicipality] = useState(municipalities[0]);
  const [activeAxis, setActiveAxis] = useState(mandateAxes[0]);
  const [editableContent, setEditableContent] = useState(() => {
    try {
      return { ...editableDefaults, ...JSON.parse(localStorage.getItem('olavinho-site-content') || '{}') };
    } catch {
      return editableDefaults;
    }
  });

  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent('Ola! Vim pelo site oficial do Olavinho Boiadeiro 10555.');
    return `https://wa.me/?text=${text}`;
  }, []);

  const updateEditableContent = (key, value) => {
    const next = { ...editableContent, [key]: value };
    setEditableContent(next);
    localStorage.setItem('olavinho-site-content', JSON.stringify(next));
  };

  const resetEditableContent = () => {
    setEditableContent(editableDefaults);
    localStorage.removeItem('olavinho-site-content');
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteudo</a>

      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Pagina inicial Olavinho Boiadeiro">
          <span className="brand-name">Olavinho</span>
          <span className="brand-number">10555</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegacao principal">
          {navItems.map(([item, href]) => <a key={item} href={href}>{item}</a>)}
        </nav>
        <div className="social-links" aria-label="Redes sociais">
          <a href="https://www.instagram.com/olavinho.boiadeiro/" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#inicio" aria-label="Facebook"><Facebook size={18} /></a>
          <a href="#videos" aria-label="YouTube"><Youtube size={18} /></a>
        </div>
        <a className="nav-cta" href="#contato">Fale com Olavinho</a>
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
            <div>
              <strong>Editor rapido</strong>
              <span>Salva neste navegador</span>
            </div>
            {editorFields.map(([key, label]) => (
              <label key={key}>
                {label}
                <textarea value={editableContent[key]} rows={key.includes('Text') || key === 'heroLead' ? 4 : 2} onChange={(event) => updateEditableContent(key, event.target.value)} />
              </label>
            ))}
            <button type="button" onClick={resetEditableContent}>Restaurar texto original</button>
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
                <strong>Olavinho <em>Boiadeiro</em></strong>
                <span>Deputado Estadual</span>
                <b>{candidate.number}</b>
                <small>{candidate.party}</small>
              </div>
            </div>
            <div className="hero-visual" aria-label="Painel visual da campanha">
              <div className="portrait-frame">
                <img src="/images/olavinho-premium-cut.webp" alt="Olavinho Boiadeiro em arte de campanha" />
                <div className="portrait-badge"><span>10555</span><strong>Republicanos</strong></div>
              </div>
              <div className="signal-card signal-card-one"><span>Base</span><strong>Acrelandia</strong><small>campo, gestao e producao</small></div>
              <div className="signal-card signal-card-two"><span>Missao</span><strong>Interior forte</strong><small>resultado com fonte</small></div>
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
          <p className="ai-disclosure">Arte conceitual de referencia visual produzida com IA. Conteudo sujeito a revisao juridica eleitoral.</p>
        </section>

        <section className="stat-ribbon" aria-label="Informacoes principais">
          {quickStats.map(([label, value, text]) => (
            <article key={label}><span>{label}</span><strong>{value}</strong><p>{text}</p></article>
          ))}
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

        <section className="accountability-section">
          <div className="accountability-media">
            <img src="/images/references/reference-proof-2.webp" alt="Referencia visual de prestacao de contas da campanha" />
          </div>
          <div className="accountability-copy">
            <p className="eyebrow">Prestacao de contas</p>
            <h2>Prova, fonte e resultado no mesmo lugar.</h2>
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
            <div><p className="eyebrow">Mapa do Acre</p><h2>{editableContent.mapTitle}</h2><p>{editableContent.mapText}</p></div>
            <div className="acre-map" role="img" aria-label="Mapa simbolico do Acre com municipios clicaveis">
              <img className="acre-map-image" src="/images/brac-map3.jpg" alt="Mapa do Estado do Acre com municipios" />
              {municipalities.map((city, index) => (
                <button type="button" key={city.name} className={`map-dot dot-${index + 1} ${activeMunicipality.name === city.name ? 'active' : ''}`} onClick={() => setActiveMunicipality(city)} aria-label={`Ver ${city.name}`}>
                  <MapPin size={18} />
                </button>
              ))}
            </div>
          </div>
          <aside className="municipality-card"><span>Territorio em foco</span><h3>{activeMunicipality.name}</h3><p>{activeMunicipality.theme}</p></aside>
        </section>

        <section className="media-hub" id="videos">
          <div className="media-feature">
            <Play size={34} />
            <p className="eyebrow">Na midia</p>
            <h2>Com prova, data e contexto.</h2>
            <p>Espaco para videos, entrevistas, podcasts, bastidores, obras e propostas com fonte.</p>
          </div>
          <div className="media-grid">
            {mediaCards.map(([title, text, icon]) => <article key={title}>{icon}<h3>{title}</h3><p>{text}</p></article>)}
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
            <p>Identificacao oficial, documentos de fonte, materiais revisados e historico de atualizacoes em uma area clara.</p>
            <div className="document-grid">
              {documentCards.map(([title, text, status]) => (
                <article key={title}><FolderOpen size={22} /><div><h3>{title}</h3><p>{text}</p><span>{status}</span></div></article>
              ))}
            </div>
          </div>
          <div className="vault-card">
            <ShieldCheck size={38} />
            <h3>Pronto para revisao juridica</h3>
            <p>Sem numero solto, sem dado ficticio do modelo e com aviso de IA quando houver arte conceitual.</p>
            <a className="button secondary" href="#compliance"><Download size={18} /> Ver checklist</a>
          </div>
        </section>

        <section className="volunteer-section">
          <div><p className="eyebrow">Seja voluntario 10555</p><h2>Quem acredita no interior ajuda a mensagem chegar mais longe.</h2><p>Cadastro, grupo, agenda, sugestoes de pauta e materiais revisados para redes sociais.</p></div>
          <a className="button primary" href={whatsappUrl}>Quero participar <ArrowRight size={18} /></a>
        </section>

        <section className="contact-section" id="contato">
          <div><p className="eyebrow">Contato</p><h2>{editableContent.contactTitle}</h2><p>{editableContent.contactText}</p></div>
          <form className="contact-form">
            <label>Nome<input type="text" name="name" autoComplete="name" required /></label>
            <label>Municipio<input type="text" name="city" required /></label>
            <label>Telefone opcional<input type="tel" name="phone" autoComplete="tel" /></label>
            <label>Mensagem<textarea name="message" rows="4" required /></label>
            <label className="checkbox"><input type="checkbox" required /> Li e concordo com a Politica de Privacidade.</label>
            <input className="honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" />
            <button className="button primary" type="submit">Enviar mensagem</button>
          </form>
        </section>

        <section className="compliance" id="compliance">
          <ShieldCheck size={28} />
          <div>
            <h2>Compliance eleitoral e LGPD desde a primeira versao.</h2>
            <p>O site separa numeros pendentes de fonte, campos legais configuraveis, consentimento de dados, registro de uso de IA e documentacao para revisao juridica antes da publicacao definitiva.</p>
            <ul>{sourceNotes.map((note) => <li key={note}><CheckCircle2 size={18} /> {note}</li>)}</ul>
          </div>
        </section>
      </main>

      <a className="whatsapp-float" href={whatsappUrl} aria-label="Abrir conversa no WhatsApp">WhatsApp</a>

      <footer className="site-footer">
        <div><strong>{candidate.name}</strong><span>{candidate.role} - {candidate.number}</span><span>{candidate.party}</span></div>
        <div><span>Eleicao 2026 - CNPJ: {candidate.campaignCnpj}</span><span>{candidate.legalResponsible} - {candidate.email}</span><span>{candidate.address}</span></div>
        <div><span>{candidate.domain}</span><span>{candidate.instagram}</span></div>
      </footer>
    </div>
  );
}

export default App;
