import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  ExternalLink,
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
  domain: 'olavinhoboiadeiro.com.br',
  instagram: '@olavinho.boiadeiro',
  campaignCnpj: '68.345.467/0001-07',
  legalResponsible: 'Olavo Francelino de Rezende',
  email: 'olavinhoboiadeiro@gmail.com',
  whatsapp: '68992575745',
  address: 'EST AC 475, S/N, KM 28 - Zona Rural - CEP 69.945-000 - Acrelandia/AC',
  coalition: 'Coligacao da Esperanca - Republicanos, PSD, NOVO e Avante',
};

const optimizedImages = {
  '/images/olavinho-official-hero.png': { stem: 'olavinho-official-hero', widths: [480, 768, 1200] },
  '/images/olavinho-official-speaking.png': { stem: 'olavinho-official-speaking', widths: [420, 720, 1000] },
  '/images/acre-map-highlight.png': { stem: 'acre-map-highlight', widths: [640, 960, 1400] },
  '/images/olavinho-supporter-profile.png': { stem: 'olavinho-supporter-profile', widths: [320, 520, 720] },
  '/images/olavinho-share-card.png': { stem: 'olavinho-share-card', widths: [640, 960, 1200] },
  '/images/asfalto-portelinha.webp': { stem: 'asfalto-portelinha', widths: [420, 720, 960] },
  '/images/acrelandia-drone.webp': { stem: 'acrelandia-drone', widths: [420, 720, 960] },
  '/images/ponte-cumaru.webp': { stem: 'ponte-cumaru', widths: [420, 720, 960] },
  '/images/agro-plantadeira.webp': { stem: 'agro-plantadeira', widths: [420, 720, 960] },
  '/images/feira-peixe.webp': { stem: 'feira-peixe', widths: [420, 720, 960] },
};

const responsiveImageProps = (src, sizes, options = {}) => {
  const image = optimizedImages[src];
  if (!image) {
    return { src, loading: options.loading || 'lazy', decoding: 'async' };
  }

  const largest = image.widths.at(-1);
  return {
    src: `/images/optimized/${image.stem}-${largest}.webp`,
    srcSet: image.widths.map((width) => `/images/optimized/${image.stem}-${width}.webp ${width}w`).join(', '),
    sizes,
    loading: options.loading || 'lazy',
    decoding: 'async',
    fetchPriority: options.fetchPriority,
  };
};

const navItems = [
  ['Inicio', '#inicio'],
  ['Historia', '#historia'],
  ['Resultados', '#resultados'],
  ['Plano', '#plano'],
  ['Publicos', '#publicos'],
  ['Videos', '#videos'],
  ['Foto 10555', '#foto-apoiador'],
  ['Imprensa', '#imprensa'],
  ['Materiais', '#materiais'],
  ['Contato', '#contato'],
];

const quickStats = [
  ['Campanha oficial', candidate.campaignCnpj, 'Identificacao publica para uma caminhada limpa e organizada'],
  ['10555', 'Deputado Estadual', 'O numero do interior produtivo na Assembleia'],
  ['Interior', 'Prioridade', 'Acrelandia, ramais, producao, saude e municipios'],
];

const focusStrip = [
  ['Acre que produz', <Tractor size={30} />],
  ['Ramal bom, producao andando', <Route size={30} />],
  ['Saude perto, vidas cuidadas', <HeartHandshake size={30} />],
  ['Municipios fortes, Acre mais forte', <Users size={30} />],
  ['Gestao eficiente, recurso com resultado', <BadgeCheck size={30} />],
];

const timeline = [
  ['01', 'Campo', 'Antes do discurso, veio a lida: estrada de terra, producao, custo alto e palavra cumprida.'],
  ['02', 'Trabalho', 'Experiencia de quem aprendeu a administrar olhando para gente, prazo, conta e resultado.'],
  ['03', 'Acrelandia', 'A base de uma historia publica feita perto dos ramais, dos bairros e de quem produz.'],
  ['04', 'Gestao', 'Obra, manutencao, recurso e cobranca: politica precisa sair do papel e chegar na vida real.'],
  ['05', '2026', 'Uma nova missao: levar a voz do interior produtivo para a Assembleia Legislativa.'],
];

const resultCards = [
  {
    label: 'Infraestrutura urbana',
    value: '15 vias',
    local: 'Bairros e vias urbanas de Acrelandia',
    before: 'Trechos com poeira, lama e deslocamento dificil para moradores e comercio.',
    after: 'Ruas em obra ou pavimentadas, com mais circulacao, acesso e valorizacao local.',
    source: 'Acervo da gestao municipal e registros locais',
    status: 'Documentos e OS em organizacao',
    impact: 'Mobilidade urbana com efeito direto na rotina de quem trabalha, estuda e empreende.',
    image: '/images/asfalto-portelinha.webp',
  },
  {
    label: 'Pacote urbano',
    value: '+ R$ 5,4 mi',
    local: 'Acrelandia - infraestrutura urbana',
    before: 'Demandas antigas dependiam de articulacao, prioridade tecnica e captacao de recurso.',
    after: 'Pacote estruturado para acelerar melhorias visiveis na cidade.',
    source: 'Prestacao de contas e acervo administrativo',
    status: 'Fonte documental a anexar',
    impact: 'Recurso captado precisa virar obra, melhoria visivel e resposta para a populacao.',
    image: '/images/acrelandia-drone.webp',
  },
  {
    label: 'Ponte do Cumaru',
    value: '+ R$ 1,5 mi',
    local: 'Regiao do Cumaru',
    before: 'Travessia fragil, insegura e limitando acesso de familias, transporte e producao.',
    after: 'Intervencao planejada para dar seguranca, continuidade de acesso e escoamento.',
    source: 'Acervo local e documentacao tecnica',
    status: 'Em validacao documental',
    impact: 'Ponte no interior e acesso a escola, saude, mercado e dignidade para quem produz.',
    image: '/images/ponte-cumaru.webp',
  },
  {
    label: 'Cafe e producao',
    value: '+70 mil',
    local: 'Produtores rurais de Acrelandia',
    before: 'Produtor precisava de incentivo, muda, orientacao e apoio para ampliar renda.',
    after: 'Entrega de mudas e apoio a cadeia produtiva para fortalecer a cafeicultura local.',
    source: 'Registros da gestao e acervo da campanha',
    status: 'Numero pendente de documento final',
    impact: 'Quando o campo cresce, a renda gira no comercio e o municipio inteiro sente.',
    image: '/images/agro-plantadeira.webp',
  },
];

const mandateAxes = [
  {
    id: '01',
    title: 'Agro forte',
    icon: <Tractor size={22} />,
    text: 'Quem produz precisa de ramal, maquina, apoio tecnico e governo que entenda a realidade do campo.',
    items: ['Ramal que escoa producao', 'Maquina onde o produtor precisa', 'Cafe, pecuaria e agroindustria'],
  },
  {
    id: '02',
    title: 'Infraestrutura',
    icon: <Landmark size={22} />,
    text: 'Infraestrutura boa encurta distancia, melhora a vida no bairro e faz a producao chegar ao mercado.',
    items: ['Pontes e ramais prioritarios', 'Obra com fonte e acompanhamento', 'Manutencao antes do abandono'],
  },
  {
    id: '03',
    title: 'Saude regional',
    icon: <HeartHandshake size={22} />,
    text: 'Saude no interior precisa de estrutura, transporte e apoio aos municipios para cuidar perto de casa.',
    items: ['Unidades mais preparadas', 'Transporte sanitario apoiado', 'Atendimento regional fortalecido'],
  },
  {
    id: '04',
    title: 'Municipios fortes',
    icon: <Users size={22} />,
    text: 'Deputado forte ajuda prefeitura a buscar recurso, destravar convenio e entregar o que a populacao cobra.',
    items: ['Recurso para chegar na ponta', 'Articulacao com responsabilidade', 'Execucao acompanhada'],
  },
  {
    id: '05',
    title: 'Emprego e renda',
    icon: <Leaf size={22} />,
    text: 'O Acre precisa gerar oportunidade no interior, para o jovem trabalhar e a familia crescer onde vive.',
    items: ['Pequeno negocio valorizado', 'Qualificacao para o jovem', 'Producao virando renda local'],
  },
  {
    id: '06',
    title: 'Transparencia',
    icon: <ClipboardCheck size={22} />,
    text: 'Compromisso serio precisa ser mostrado com clareza: onde, para quem, com qual recurso e qual resultado.',
    items: ['Proposta com territorio', 'Foto real e fonte', 'Prestacao de contas simples'],
  },
];

const accountabilityItems = [
  ['Ramal por ramal', 'Ouvir quem vive na zona rural e transformar demanda em prioridade de mandato.'],
  ['Obra por obra', 'Mostrar local, impacto e caminho do recurso para o eleitor acompanhar de verdade.'],
  ['Antes e depois', 'Resultado precisa ser visto, comparado e explicado sem exagero e sem fantasia.'],
  ['Compromisso claro', 'Cada bandeira deve dizer quem atende, qual problema resolve e como pode sair do papel.'],
  ['Parceiros presentes', 'Reconhecer quem ajuda o municipio avancar e somar forcas pelo interior.'],
  ['Acompanhamento publico', 'Agenda, plano e entregas organizadas para a populacao cobrar e participar.'],
];

const mediaCards = [
  ['Olavinho falando direto', 'Videos curtos para explicar proposta sem enrolacao: ramal, saude, producao e gestao.', <Newspaper size={28} />],
  ['Agenda na estrada', 'Acompanhe onde a campanha esta ouvindo produtor, lideranca, juventude e comunidade.', <CalendarDays size={28} />],
  ['Resultado com contexto', 'Cada entrega precisa vir com historia, local, imagem e impacto na vida das pessoas.', <ClipboardCheck size={28} />],
  ['Compartilhe 10555', 'Leve a mensagem do interior forte para grupos, familia, vizinhos e amigos.', <Share2 size={28} />],
];

const featuredReel = {
  title: 'Foi por revolta e compromisso.',
  text: 'Olavinho entrou na politica ao ver gente trabalhadora esperando melhorias que nao chegavam. Das estradas dificeis e pontes precarias nasceu o compromisso com Acrelandia, infraestrutura e qualidade de vida.',
  url: 'https://www.instagram.com/p/DaWUOYzM1Sn/',
  embedUrl: 'https://www.instagram.com/p/DaWUOYzM1Sn/embed',
  label: 'Video oficial no Instagram',
};

const instagramVideoCards = [
  {
    title: 'Juntos somos mais fortes',
    text: 'Reel oficial para mobilizar apoiadores e fortalecer a presenca digital do 10555.',
    url: 'https://www.instagram.com/reel/DcTiGooMk_S/',
    embedUrl: 'https://www.instagram.com/reel/DcTiGooMk_S/embed',
    label: 'Instagram oficial',
  },
  {
    title: 'Olavinho nas redes',
    text: 'Publicacao oficial para aproximar a campanha de quem acompanha pelo celular.',
    url: 'https://www.instagram.com/p/DbRDKGwMg8E/',
    embedUrl: 'https://www.instagram.com/p/DbRDKGwMg8E/embed',
    label: 'Instagram oficial',
  },
  {
    title: 'Mobilizacao 10555',
    text: 'Material de rede social para ampliar a presenca da campanha no Acre.',
    url: 'https://www.instagram.com/p/DbPPvSitwi7/',
    embedUrl: 'https://www.instagram.com/p/DbPPvSitwi7/embed',
    label: 'Instagram oficial',
  },
];

const supportFrameUrl = 'https://apoio.top/q/olavinhoboiadeiro10555';

const testimonials = [
  ['Produtor rural', 'Quem vive no ramal sabe: promessa nao tira atoleiro. Precisa de alguem que conheca a producao e cobre resultado.'],
  ['Empreendedora local', 'Quando o municipio melhora, o comercio respira, a familia compra e o trabalho aparece. Essa e a conversa certa.'],
  ['Lideranca comunitaria', 'Olavinho chega para ouvir problema real, sem discurso distante. Isso cria confianca.'],
];

const pressNotes = [
  ['Campanha no interior', 'Encontros para ouvir quem pega ramal, toca producao, empreende e conhece a realidade do Acre.'],
  ['Plano 10555', 'Seis eixos para defender agro, infraestrutura, saude, municipios fortes, renda e transparencia.'],
  ['Acrelandia como base', 'A experiencia de gestao vira argumento: recurso precisa chegar onde a vida acontece.'],
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
  ['Acrelandia', 'Conversa com feira, produtores, comercio e liderancas locais', 'Proxima agenda em confirmacao'],
  ['Zona rural', 'Ramal, ponte, cafe, mecanizacao e demandas de quem produz', 'Recebendo convites'],
  ['Municipios do interior', 'Escuta popular para transformar problema real em pauta de mandato', 'Chamadas abertas'],
];

const conversionActions = [
  {
    title: 'Chamar no WhatsApp',
    text: 'Fale direto com a campanha, envie sua demanda e receba orientacao para participar.',
    action: 'Chamar agora',
    href: 'contact-whatsapp',
    icon: <HeartHandshake size={26} />,
  },
  {
    title: 'Entrar no grupo',
    text: 'Receba agenda, chamadas de mobilizacao e mensagens oficiais para fortalecer o 10555.',
    action: 'Entrar no grupo',
    href: 'whatsapp',
    icon: <Users size={26} />,
  },
  {
    title: 'Quero ser voluntario',
    text: 'Ajude a levar a mensagem de Olavinho para sua rua, seu ramal, sua familia e seu municipio.',
    action: 'Ser voluntario',
    href: '#voluntario',
    icon: <HeartHandshake size={26} />,
  },
  {
    title: 'Receber material',
    text: 'Baixe argumentos, propostas e textos prontos para defender o interior com seguranca.',
    action: 'Ver materiais',
    href: '#materiais',
    icon: <Download size={26} />,
  },
  {
    title: 'Mandar proposta',
    text: 'Conte o problema do seu bairro, ramal, setor produtivo ou municipio para virar pauta.',
    action: 'Enviar proposta',
    href: '#contato',
    icon: <FileText size={26} />,
  },
  {
    title: 'Compartilhar com 5 pessoas',
    text: 'Envie o site para amigos, familia e liderancas que querem um Acre mais forte.',
    action: 'Compartilhar agora',
    href: 'share',
    icon: <Share2 size={26} />,
  },
];

const audienceProposals = [
  {
    title: 'Produtor rural',
    icon: <Tractor size={26} />,
    image: '/images/agro-plantadeira.webp',
    points: ['Ramal bom para tirar a producao do isolamento', 'Mecanizacao e apoio tecnico de verdade', 'Cafe, pecuaria e agroindustria gerando renda local'],
  },
  {
    title: 'Saude perto',
    icon: <HeartHandshake size={26} />,
    image: '/images/feira-peixe.webp',
    points: ['Atendimento regional mais perto das familias', 'Transporte sanitario com apoio e planejamento', 'Municipio fortalecido para cuidar melhor'],
  },
  {
    title: 'Infraestrutura',
    icon: <Landmark size={26} />,
    image: '/images/asfalto-portelinha.webp',
    points: ['Pontes, ruas e ramais definidos por prioridade real', 'Manutencao antes do problema virar abandono', 'Obra acompanhada pela populacao'],
  },
  {
    title: 'Juventude',
    icon: <Leaf size={26} />,
    image: '/images/acrelandia-drone.webp',
    points: ['Qualificacao ligada ao trabalho que existe no Acre', 'Esporte, tecnologia e oportunidade perto de casa', 'Primeiro emprego e renda para ficar no interior'],
  },
  {
    title: 'Mulheres',
    icon: <Users size={26} />,
    image: '/images/olavinho-official-speaking.png',
    points: ['Saude, protecao e autonomia economica', 'Apoio a maes, produtoras e empreendedoras', 'Apoio as maes atipicas, com atencao a familias de criancas autistas', 'Politica publica perto da rotina real da mulher'],
  },
  {
    title: 'Municipios',
    icon: <MapPin size={26} />,
    image: '/images/acre-map-highlight.png',
    points: ['Prefeitura com apoio para buscar recurso', 'Interior ouvido antes da decisao em Rio Branco', 'Acre forte com municipio forte'],
  },
];

const materialDownloads = [
  ['Plano 10555 para o interior', 'Um resumo direto para explicar como Olavinho quer defender producao, ramal, saude e municipio forte.', '/materiais/plano-10555.txt'],
  ['Kit de conversa do apoiador', 'Argumentos curtos para falar com vizinho, familia, produtor, comerciante e lideranca local.', '/materiais/kit-voluntario-10555.txt'],
  ['Propostas por realidade', 'Pautas organizadas para produtor rural, saude, infraestrutura, juventude, mulheres e municipios.', '/materiais/propostas-por-publico-10555.txt'],
];

const documentCards = [
  ['Identificacao oficial', 'Candidato, partido, numero, CNPJ e canais para acompanhar a campanha com seguranca.', '10555'],
  ['Plano para o Acre', 'Eixos de mandato voltados para interior, producao, ramal, saude e oportunidade.', '6 eixos'],
  ['Resultados em Acrelandia', 'Experiencia de gestao apresentada com territorio, imagem e contexto para o eleitor avaliar.', 'Gestao'],
  ['Agenda no interior', 'Visitas, encontros e escutas para transformar demanda local em compromisso publico.', 'Agenda'],
  ['Galeria oficial', 'Registros reais de campanha, campo, obra, entrevistas e presenca nos municipios.', 'Acervo'],
  ['Fale com Olavinho', 'Canal direto para mandar proposta, convite, demanda do ramal ou apoio voluntario.', 'Contato'],
];

const editableDefaults = {
  heroEyebrow: 'Olavinho Boiadeiro - Republicanos',
  heroTitleTop: 'Acre que produz.',
  heroTitleBottom: 'Interior que funciona.',
  heroLead: 'Olavinho conhece o Acre de quem trabalha cedo, enfrenta ramal, produz, empreende e cobra resultado. Uma campanha para defender o interior com experiencia, coragem e palavra.',
  whatsappGroupUrl: 'https://chat.whatsapp.com/FcjDMpaYbam7Acv8meG20S?s=sh&p=a&ilr=1',
  storyEyebrow: 'Antes da politica, ja existia trabalho',
  storyTitle: 'Uma historia construida trabalhando.',
  storyText: 'Antes da campanha, houve uma vida ligada ao campo, ao trabalho e a Acrelandia. Essa historia ajuda a explicar por que Olavinho fala de ramal, producao, saude e municipio forte sem precisar decorar discurso.',
  storyQuote: 'Quem conhece a realidade do interior sabe onde a politica precisa chegar.',
  resultsEyebrow: 'Resultado gera confianca',
  resultsTitle: 'Trabalho que aparece na vida real.',
  resultsText: 'O eleitor precisa enxergar prova: numero, local, antes, depois, fonte, status e impacto. Resultado com imagem, territorio e contexto vale mais que promessa solta.',
  mapTitle: '22 municipios. Um so Acre.',
  mapText: 'Acrelandia e o ponto de partida, mas a missao e maior: ouvir os 22 municipios e defender um Acre onde o interior tenha voz, estrada, saude e oportunidade.',
  contactTitle: 'Fale com Olavinho.',
  contactText: 'Mande sua demanda, proposta ou convite. A campanha quer ouvir quem vive o bairro, o ramal, a producao e os desafios de cada municipio.',
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

  const whatsappContactUrl = useMemo(() => {
    const digits = candidate.whatsapp.replace(/\D/g, '');
    const internationalNumber = digits.startsWith('55') ? digits : `55${digits}`;
    const text = encodeURIComponent('Ola! Quero falar com a equipe do Olavinho Boiadeiro 10555.');
    return `https://wa.me/${internationalNumber}?text=${text}`;
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('website')) return;

    const name = String(formData.get('name') || '').trim();
    const city = String(formData.get('city') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const lines = [
      'Ola! Quero falar com a equipe do Olavinho Boiadeiro 10555.',
      name && `Nome: ${name}`,
      city && `Municipio: ${city}`,
      phone && `Telefone: ${phone}`,
      message && `Mensagem: ${message}`,
    ].filter(Boolean);
    const digits = candidate.whatsapp.replace(/\D/g, '');
    const internationalNumber = digits.startsWith('55') ? digits : `55${digits}`;
    window.open(`https://wa.me/${internationalNumber}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  };

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
            <img {...responsiveImageProps('/images/acrelandia-drone.webp', '100vw', { loading: 'eager', fetchPriority: 'high' })} alt="" />
          </div>
          <div className="tech-grid" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{editableContent.heroEyebrow}</p>
              <h1 id="hero-title">{editableContent.heroTitleTop}<span>{editableContent.heroTitleBottom}</span></h1>
              <p className="hero-lead">{editableContent.heroLead}</p>
              <div className="campaign-signature" aria-label={`${candidate.name}, numero ${candidate.number}, ${candidate.party}`}>
                <strong>{candidate.number}</strong>
                <span>{candidate.party}</span>
                <small>Deputado Estadual - Acre</small>
              </div>
              <div className="hero-actions">
                <a className="button primary" href="#historia">Conheca a trajetoria <ArrowRight size={18} /></a>
                <a className="button secondary" href="#plano">Ver plano 10555</a>
                <a className="button whatsapp-direct" href={whatsappContactUrl}>WhatsApp 68 99257-5745</a>
              </div>
            </div>
            <div className="hero-visual" aria-label="Painel visual da campanha">
              <div className="portrait-frame">
                <img {...responsiveImageProps('/images/olavinho-official-hero.png', '(max-width: 720px) 92vw, (max-width: 1440px) 520px, 620px', { loading: 'eager', fetchPriority: 'high' })} alt="Olavinho Boiadeiro em foto oficial de campanha" />
                <div className="portrait-badge">
                  <img src="/images/olavinho-logo-principal.png" alt="Olavinho Boiadeiro Deputado Estadual" />
                </div>
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
            <h2>O interior forte tambem depende de voce.</h2>
            <p>Entre na mobilizacao, chame a campanha para ouvir sua comunidade e ajude a mensagem do 10555 chegar em quem trabalha, produz e acredita no Acre.</p>
          </div>
          <div className="conversion-grid">
            <article className="featured-reel-card">
              <div>
                <span><Instagram size={18} /> {featuredReel.label}</span>
                <h3>{featuredReel.title}</h3>
                <p>{featuredReel.text}</p>
                <a href={featuredReel.url} target="_blank" rel="noreferrer">Abrir Reel <ExternalLink size={17} /></a>
              </div>
              <iframe
                src={featuredReel.embedUrl}
                title="Video oficial Foi por revolta e compromisso"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </article>
            {conversionActions.map((item) => {
              const href = item.href === 'whatsapp' ? whatsappGroupUrl : item.href === 'contact-whatsapp' ? whatsappContactUrl : item.href;
              return (
                <article key={item.title}>
                  {item.icon}
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.href === 'share' ? (
                    <button type="button" className="card-action-link" onClick={shareCampaign}>{item.action} <Share2 size={17} /></button>
                  ) : (
                    <a href={href}>{item.action} <ArrowRight size={17} /></a>
                  )}
                </article>
              );
            })}
          </div>
          <div className="campaign-funnel" aria-label="Caminho de apoio da campanha">
            <span>1. Entre no grupo</span>
            <span>2. Receba material</span>
            <span>3. Mande uma proposta</span>
            <span>4. Compartilhe com 5 pessoas</span>
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
              <div className="proof-checklist" aria-label="Criterios de prestacao de contas">
                <span><CheckCircle2 size={16} /> Numero</span>
                <span><CheckCircle2 size={16} /> Local</span>
                <span><CheckCircle2 size={16} /> Fonte</span>
                <span><CheckCircle2 size={16} /> Status</span>
                <span><CheckCircle2 size={16} /> Impacto</span>
              </div>
              <a className="inline-link" href="#arquivos"><FileText size={18} /> Ver fontes e documentos</a>
            </div>
            <div className="case-grid">
              {resultCards.map((card) => (
                <article className="case-card proof-card" key={card.label}>
                  <img {...responsiveImageProps(card.image, '(max-width: 720px) 92vw, (max-width: 1080px) 44vw, 430px')} alt="" />
                  <div className="proof-card-body">
                    <div className="proof-card-top">
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                    </div>
                    <dl className="proof-meta">
                      <div><dt>Local</dt><dd>{card.local}</dd></div>
                      <div><dt>Fonte</dt><dd>{card.source}</dd></div>
                      <div><dt>Status</dt><dd>{card.status}</dd></div>
                    </dl>
                    <div className="before-after">
                      <p><b>Antes</b>{card.before}</p>
                      <p><b>Depois</b>{card.after}</p>
                    </div>
                    <p className="proof-impact"><CheckCircle2 size={18} /> {card.impact}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="proposal-console" id="plano">
          <div className="console-header">
            <div><p className="eyebrow">Plano de mandato</p><h2>Compromisso com quem vive a realidade do Acre.</h2></div>
            <a className="button secondary" href="#arquivos"><Download size={18} /> Ver plano 10555</a>
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
            <h2>Cada realidade do Acre precisa ser ouvida.</h2>
          </div>
          <div className="audience-grid">
            {audienceProposals.map((group) => (
              <article key={group.title}>
                <img {...responsiveImageProps(group.image, '(max-width: 720px) 92vw, (max-width: 1080px) 44vw, 390px')} alt="" />
                <div className="audience-card-body">
                  <span>{group.icon}{group.title}</span>
                  <ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  <a href="#contato">Mandar demanda <ArrowRight size={16} /></a>
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
            <h2>Confianca se constrói mostrando resultado.</h2>
            <p>Olavinho defende uma politica em que o eleitor consiga enxergar a obra, entender o caminho do recurso e cobrar o que foi prometido.</p>
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
              <img className="acre-map-image" {...responsiveImageProps('/images/acre-map-highlight.png', '(max-width: 720px) 96vw, (max-width: 1440px) 78vw, 1100px')} alt="Mapa do Estado do Acre com Acrelandia em destaque" />
            </div>
          </div>
        </section>

        <section className="media-hub" id="videos">
          <div className="media-feature">
            <Play size={34} />
            <img className="media-speaker" {...responsiveImageProps('/images/olavinho-official-speaking.png', '(max-width: 720px) 56vw, (max-width: 1440px) 360px, 430px')} alt="Olavinho Boiadeiro falando com microfone" />
            <p className="eyebrow">Videos oficiais</p>
            <h2>Olavinho falando olhando para o Acre real.</h2>
            <p>Falas curtas, entrevistas e bastidores para explicar proposta com clareza e aproximar a campanha de quem vive no interior.</p>
          </div>
          <div className="media-grid">
            {mediaCards.map(([title, text, icon]) => <article key={title}>{icon}<h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="video-section">
          <div className="video-wall">
            {instagramVideoCards.map((video, index) => (
              <article key={video.url} className={index === 0 ? 'featured-video instagram-video-card' : 'instagram-video-card'}>
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
                <span>{video.label}</span>
                <h3>{video.title}</h3>
                <p>{video.text}</p>
                <a href={video.url} target="_blank" rel="noreferrer">Abrir no Instagram <ExternalLink size={16} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="supporter-frame-section" id="foto-apoiador">
          <div>
            <p className="eyebrow">Foto de apoiador</p>
            <h2>Entre na campanha com sua propria imagem.</h2>
            <p>O apoiador pode personalizar a foto de perfil com a identidade do Olavinho Boiadeiro 10555 e usar nas redes sociais.</p>
          </div>
          <article className="supporter-frame-card">
            <img {...responsiveImageProps('/images/olavinho-supporter-profile.png', '(max-width: 720px) 86vw, (max-width: 1080px) 38vw, 360px')} alt="Exemplo de foto de apoiador personalizada com Olavinho Boiadeiro 10555" />
            <div>
              <span>Ferramenta oficial de apoio</span>
              <h3>Personalizar minha foto 10555</h3>
              <p>Veja como a foto fica depois da geracao: rosto em destaque, bandeira do Acre e marca 10555 pronta para WhatsApp, Instagram e Facebook.</p>
              <a className="button primary" href={supportFrameUrl} target="_blank" rel="noreferrer">Criar foto de apoio <ExternalLink size={18} /></a>
            </div>
          </article>
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
            <h2>Uma campanha presente, documentada e aberta ao eleitor.</h2>
            <p>Agenda, entrevistas e comunicados para mostrar onde Olavinho esta, quem esta ouvindo e quais pautas vai defender.</p>
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
            <h2>Imagem real de quem caminha pelo Acre.</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map(([src, alt]) => <img key={src} {...responsiveImageProps(src, '(max-width: 720px) 92vw, (max-width: 1080px) 44vw, 390px')} alt={alt} />)}
          </div>
        </section>

        <section className="materials-section" id="materiais">
          <div>
            <p className="eyebrow">Kit do apoiador</p>
            <h2>Argumento forte para defender o 10555.</h2>
            <p>Materiais para conversar com vizinho, familia, produtor e lideranca local com uma mensagem clara: o interior precisa de voz, estrada, saude e resultado.</p>
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
          <div><p className="eyebrow">Olavinho na estrada</p><h2>A campanha vai onde a vida do Acre acontece.</h2></div>
          <div className="agenda-list">
            {agendaItems.map(([place, title, status]) => (
              <article key={place}><CalendarDays size={24} /><div><span>{place}</span><h3>{title}</h3><p>{status}</p></div></article>
            ))}
          </div>
        </section>

        <section className="documents-section" id="arquivos">
          <div className="documents-copy">
            <p className="eyebrow">Arquivos do candidato</p>
            <h2>Informacao oficial para votar com seguranca.</h2>
            <p>Dados da campanha, plano, agenda, fotos e canais de participacao reunidos para o eleitor acompanhar, compartilhar e cobrar.</p>
            <div className="document-grid">
              {documentCards.map(([title, text, status]) => (
                <article key={title}><FolderOpen size={22} /><div><h3>{title}</h3><p>{text}</p><span>{status}</span></div></article>
              ))}
            </div>
          </div>
          <div className="vault-card public-card">
            <img className="secondary-logo-card" src="/images/olavinho-logo-secundaria.png" alt="Olavinho Boiadeiro 10555" />
            <h3>O 10555 organizado para quem quer ajudar</h3>
            <p>Marca, proposta, agenda e contato em um so lugar para fortalecer a campanha com responsabilidade.</p>
            <a className="button secondary" href="#contato"><ArrowRight size={18} /> Falar com a campanha</a>
          </div>
        </section>

        <section className="volunteer-section" id="voluntario">
          <div><p className="eyebrow">Seja voluntario 10555</p><h2>Quem acredita no interior ajuda essa mensagem chegar mais longe.</h2><p>Entre no grupo, chame pessoas de confianca, envie demandas do seu municipio e ajude Olavinho a falar com quem vive a realidade do Acre.</p></div>
          <a className="button primary" href={whatsappGroupUrl}>Entrar no grupo <ArrowRight size={18} /></a>
        </section>

        <section className="contact-section" id="contato">
          <div><p className="eyebrow">Contato</p><h2>{editableContent.contactTitle}</h2><p>{editableContent.contactText}</p></div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Nome<input type="text" name="name" autoComplete="name" required /></label>
            <label>Municipio<input type="text" name="city" required /></label>
            <label>Telefone opcional<input type="tel" name="phone" autoComplete="tel" /></label>
            <label>Mensagem<textarea name="message" rows="4" required /></label>
            <label className="checkbox"><input type="checkbox" required /> Autorizo a equipe da campanha a responder meu contato.</label>
            <input className="honeypot" type="text" name="website" tabIndex="-1" autoComplete="off" />
            <button className="button primary" type="submit">Enviar no WhatsApp</button>
            <a className="contact-whatsapp-link" href={whatsappContactUrl}>Chamar direto: 68 99257-5745</a>
          </form>
        </section>

      </main>

      <div className="floating-actions">
        <button type="button" onClick={shareCampaign} aria-label="Compartilhar site da campanha">
          <Share2 size={18} /> {shareStatus || 'Compartilhar'}
        </button>
        <a className="whatsapp-float" href={whatsappContactUrl} aria-label="Chamar a campanha no WhatsApp">WhatsApp direto</a>
      </div>

      <footer className="site-footer" aria-label="Informacoes legais da campanha">
        <div className="footer-brand">
          <img className="footer-logo" src="/images/olavinho-logo-principal.png" alt="Olavinho Boiadeiro Deputado Estadual" />
          <strong>{candidate.name} {candidate.number}</strong>
          <span>{candidate.role}</span>
          <span>{candidate.party}</span>
        </div>
        <div className="footer-legal-card">
          <strong>Identificacao oficial</strong>
          <span>Eleicao 2026</span>
          <span>CNPJ: {candidate.campaignCnpj}</span>
          <span>Responsavel: {candidate.legalResponsible}</span>
          <span>{candidate.coalition}</span>
          <span>{candidate.address}</span>
        </div>
        <div className="footer-legal-card">
          <strong>Contato oficial</strong>
          <a href={`https://${candidate.domain}`}>{candidate.domain}</a>
          <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
          <a href={whatsappContactUrl}>WhatsApp: 68 99257-5745</a>
          <span>Instagram: {candidate.instagram}</span>
        </div>
        <div className="footer-legal-card footer-links">
          <strong>Transparencia e dados</strong>
          <a href="/politica-de-privacidade.html">Politica de privacidade</a>
          <a href="/lgpd.html">LGPD e tratamento de dados</a>
          <a href="/termos-de-uso.html">Termos de uso</a>
          <a href="#arquivos">Central de documentos</a>
        </div>
        <div className="footer-notice">
          <strong>Propaganda eleitoral</strong>
          <p>Site oficial da campanha Olavinho Boiadeiro 10555 - Deputado Estadual. Material de comunicacao eleitoral identificado com CNPJ {candidate.campaignCnpj}, responsavel {candidate.legalResponsible} e canais oficiais informados nesta pagina.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
