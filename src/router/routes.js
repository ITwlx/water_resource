import EventExtraction from '@/pages/EventExtraction'
import MiningAnalysis from '@/pages/MinIngAnalysis'
import EventRetrieval from '@/pages/EventRetrieval'
import ForestAnalysis from '@/pages/ForestAnalysis'
import KnowledgeModel from '@/pages/KnowledgeModel'
import Login from '@/pages/Login'
export default [
    {
        name:'shijianchouqu',
        component:EventExtraction,
        path:'/eventectraction'
    },
    {
        name:'wajuefenxi',
        component:MiningAnalysis,
        path:'/mininganalysis'
    },
    {
        name:'shijianjiansuo',
        component:EventRetrieval,
        path:'/eventretrieval'
    },
    {
        name:'yucefenxi',
        component:ForestAnalysis,
        path:'/forestanalysis'
    },
    {
        name:'zhishijianmo',
        component:KnowledgeModel,
        path:'/knowledgemodel'
    },
    {
        name:'denglu',
        component:Login,
        path:'/login'
    },
]