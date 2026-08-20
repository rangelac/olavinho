import { useState, useEffect } from 'react';
import { Save, Facebook, AlertCircle, CheckCircle } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [credentials, setCredentials] = useState({
    appId: '',
    appSecret: '',
    accessToken: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('metaDashCreds');
    if (saved) {
      setCredentials(JSON.parse(saved));
    }
  }, []);

  const initFacebookSdk = (appId) => {
    if (window.FB) return;
    
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : appId,
        cookie     : true,
        xfbml      : true,
        version    : 'v19.0'
      });
      console.log('FB SDK initialized with appId:', appId);
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/pt_BR/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  };

  useEffect(() => {
    if (credentials.appId && credentials.appId.length > 5) {
      initFacebookSdk(credentials.appId);
    }
  }, [credentials.appId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('metaDashCreds', JSON.stringify(credentials));
    if (credentials.appId && !window.FB) {
      initFacebookSdk(credentials.appId);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFacebookLogin = () => {
    if (!credentials.appId) {
      alert('Por favor, informe e salve o App ID primeiro.');
      return;
    }
    if (!window.FB) {
      alert('SDK do Facebook não carregado. Verifique seu App ID ou recarregue a página.');
      return;
    }

    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('Login bem-sucedido!', response.authResponse);
        const token = response.authResponse.accessToken;
        const updatedCreds = { ...credentials, accessToken: token };
        setCredentials(updatedCreds);
        localStorage.setItem('metaDashCreds', JSON.stringify(updatedCreds));
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'ads_read,ads_management,pages_show_list,pages_read_engagement'});
  };

  return (
    <div className="content-area glass-panel settings-container" style={{ margin: '1rem 1rem 1rem 0' }}>
      <div className="settings-header">
        <h2>Configurações da API</h2>
        <p>Insira as credenciais do seu aplicativo Meta e conecte sua conta para carregar os dados.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="card-header">
            <h3>Credenciais do Aplicativo</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>App ID</label>
              <input 
                type="text" 
                name="appId"
                className="input-base" 
                value={credentials.appId}
                onChange={handleChange}
                placeholder="Ex: 3449357441906425" 
              />
            </div>
            <div className="form-group">
              <label>Chave Secreta do Aplicativo</label>
              <input 
                type="password" 
                name="appSecret"
                className="input-base" 
                value={credentials.appSecret}
                onChange={handleChange}
                placeholder="Sua chave secreta..." 
              />
            </div>
            
            <button className="btn-primary" onClick={handleSave}>
              <Save size={18} />
              Salvar Credenciais
            </button>
            {isSaved && <span className="status-msg success"><CheckCircle size={16}/> Salvo com sucesso!</span>}
          </div>
        </div>

        <div className="settings-card highlight-card">
          <div className="card-header">
            <h3>Autenticação de Usuário</h3>
          </div>
          <div className="card-body">
            <p className="auth-description">
              Para buscar dados de Campanhas, Anúncios e Insights Orgânicos, você precisa conectar sua conta do Facebook que tem acesso ao Gerenciador de Anúncios.
            </p>
            
            <div className={`auth-status ${credentials.accessToken ? 'success' : 'pending'}`}>
              {credentials.accessToken ? <CheckCircle size={24} className="status-icon" style={{color: 'var(--success)'}}/> : <AlertCircle size={24} className="status-icon" />}
              <div>
                <strong>{credentials.accessToken ? 'Conectado' : 'Não conectado'}</strong>
                <span>{credentials.accessToken ? 'Token de acesso gerado e salvo.' : 'Faça login para gerar o token de acesso.'}</span>
              </div>
            </div>

            <button className="btn-facebook" onClick={handleFacebookLogin}>
              <Facebook size={20} />
              Conectar com Facebook
            </button>
            
            <div className="divider"><span>OU INSIRA MANUALMENTE</span></div>
            
            <div className="form-group">
              <label>User Access Token</label>
              <textarea 
                className="input-base" 
                name="accessToken"
                value={credentials.accessToken}
                onChange={handleChange}
                placeholder="Cole seu token de longa duração aqui..."
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
