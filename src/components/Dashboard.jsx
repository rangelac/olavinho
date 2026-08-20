import { useState, useEffect } from 'react';
import { 
  DollarSign, MousePointerClick, Eye, Target, 
  Calendar, ChevronDown
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { metaApi } from '../services/metaApi';
import './Dashboard.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, Filler
);

const KPICard = ({ title, value, prefix, trend, icon: Icon, color }) => (
  <div className="kpi-card glass-panel">
    <div className="kpi-icon" style={{ background: `rgba(${color}, 0.15)`, color: `rgb(${color})` }}>
      <Icon size={24} />
    </div>
    <div className="kpi-content">
      <span className="kpi-title">{title}</span>
      <div className="kpi-value-row">
        <h3 className="kpi-value">
          {prefix}{value}
        </h3>
        {trend && (
          <span className={`kpi-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('last_7d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [kpis, setKpis] = useState({
    spend: 0, clicks: 0, impressions: 0, reach: 0
  });

  const [campaignData, setCampaignData] = useState({
    labels: ['Sem dados'],
    datasets: [{ label: 'Cliques', data: [0], backgroundColor: '#8b5cf6', borderRadius: 6 }]
  });

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem('metaDashCreds');
      if (!saved) return;
      const creds = JSON.parse(saved);
      
      if (!creds.accessToken) {
        setConnected(false);
        return;
      }

      setConnected(true);
      metaApi.setToken(creds.accessToken);
      setLoading(true);
      setError(null);

      try {
        const accounts = await metaApi.getAdAccounts();
        if (accounts.data && accounts.data.length > 0) {
          const mainAccountId = accounts.data[0].id;
          
          // Busca insights gerais (KPIs)
          const insights = await metaApi.getOverallInsights(mainAccountId, dateRange);
          if (insights.data && insights.data.length > 0) {
            const sum = insights.data[0];
            setKpis({
              spend: parseFloat(sum.spend || 0),
              clicks: parseInt(sum.clicks || 0),
              impressions: parseInt(sum.impressions || 0),
              reach: parseInt(sum.reach || 0)
            });
          } else {
            setKpis({ spend: 0, clicks: 0, impressions: 0, reach: 0 });
          }

          // Busca Campanhas
          const campaignsResult = await metaApi.getCampaigns(mainAccountId, dateRange);
          if (campaignsResult.data && campaignsResult.data.length > 0) {
            const labels = [];
            const clicksData = [];
            
            campaignsResult.data.forEach(camp => {
              labels.push(camp.name.substring(0, 15) + (camp.name.length > 15 ? '...' : ''));
              if (camp.insights && camp.insights.data && camp.insights.data.length > 0) {
                clicksData.push(parseInt(camp.insights.data[0].clicks || 0));
              } else {
                clicksData.push(0);
              }
            });

            setCampaignData({
              labels,
              datasets: [{
                label: 'Cliques',
                data: clicksData,
                backgroundColor: '#8b5cf6',
                borderRadius: 6
              }]
            });
          }
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Erro ao buscar dados. Verifique a validade do seu token.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateRange]);

  // MOCK DATA PARA VISUALIZAÇÃO (Evolução de gastos não disponível facilmente sem breakdown por dia)
  const lineChartData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Gasto Simulado (R$)',
        data: connected ? [kpis.spend*0.1, kpis.spend*0.2, kpis.spend*0.15, kpis.spend*0.25, kpis.spend*0.1, kpis.spend*0.1, kpis.spend*0.1] : [120, 190, 150, 220, 180, 250, 210],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  return (
    <div className="dashboard-container content-area" style={{ margin: '1rem 1rem 1rem 0' }}>
      
      {/* Date Filter */}
      <div className="dashboard-header-actions">
        {error && <span style={{color: 'var(--danger)', marginRight: 'auto', alignSelf: 'center'}}>{error}</span>}
        {!connected && <span style={{color: 'var(--warning)', marginRight: 'auto', alignSelf: 'center'}}>Exibindo dados de exemplo. Crie o App ID e faça login na aba Configurações.</span>}
        <div className="date-picker glass-panel" onClick={() => setDateRange(dateRange === 'last_7d' ? 'last_30d' : 'last_7d')}>
          <Calendar size={18} className="text-secondary" />
          <span>{dateRange === 'last_7d' ? 'Últimos 7 dias' : 'Últimos 30 dias'}</span>
          <ChevronDown size={16} className="text-secondary" />
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KPICard 
          title="Valor Gasto" value={connected ? kpis.spend.toLocaleString('pt-BR') : "1.320,50"} prefix="R$ " trend={12.5} 
          icon={DollarSign} color="239, 68, 68" 
        />
        <KPICard 
          title="Cliques no Link" value={connected ? kpis.clicks.toLocaleString('pt-BR') : "4.580"} trend={-2.4} 
          icon={MousePointerClick} color="59, 130, 246" 
        />
        <KPICard 
          title="Impressões" value={connected ? kpis.impressions.toLocaleString('pt-BR') : "124.5K"} trend={8.2} 
          icon={Eye} color="139, 92, 246" 
        />
        <KPICard 
          title="Alcance" value={connected ? kpis.reach.toLocaleString('pt-BR') : "84.2K"} trend={18.0} 
          icon={Target} color="16, 185, 129" 
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3>Evolução de Gastos</h3>
          </div>
          <div className="chart-body">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card glass-panel">
          <div className="chart-header">
            <h3>Cliques por Campanha (Top Campanhas)</h3>
          </div>
          <div className="chart-body">
            {loading ? <div style={{display:'flex', height:'100%', alignItems:'center', justifyContent:'center'}}>Carregando...</div> : 
             <Bar data={connected ? campaignData : {
                labels: ['Campanha A', 'Campanha B', 'Campanha C', 'Campanha D'],
                datasets: [
                  {
                    label: 'Cliques',
                    data: [1200, 1900, 800, 2100],
                    backgroundColor: '#8b5cf6',
                    borderRadius: 6
                  }
                ]
             }} options={chartOptions} />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
