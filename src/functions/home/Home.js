import React, { useEffect } from 'react';
import { useQuizStats } from '../quiz/useQuizStats'; // カスタムフックをインポート
import useLearningStats from '../learning/useLearningStats';
import { Button, Typography, Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const quizStats = useQuizStats(); // カスタムフックを使用
  const quizAccuracyRate = quizStats.accuracyRate
  const { achievementRate } = useLearningStats();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `ホーム`;
  });

  return (
    <Box sx={{ padding: '0 23rem' }}>

      <Typography variant='h4' gutterBottom textAlign={'center'} className='japanese-text'>
      <ruby>目指<rt>めざ</rt>せ、</ruby><ruby>Disaster<rt>ディザスター</rt></ruby> <ruby>Master<rt>マスター</rt></ruby>
      </Typography>
      
      {/* 学習達成率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={achievementRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography variant='h6' className='japanese-text'><ruby>学習<rt>がくしゅう</rt></ruby>の<ruby>成績<rt>せいせき</rt></ruby>: {achievementRate}%</Typography>
      </Box>

      {/* クイズ正答率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={quizAccuracyRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography variant='h6' className='japanese-text'><ruby>問題<rt>もんだい</rt></ruby>の<ruby>成績<rt>せいせき</rt></ruby>: {quizAccuracyRate}%</Typography>
      </Box>

      {/* 各ページへのリンクボタン */}
      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/learning')} sx={{ fontSize: '16px' }} className='japanese-text'>
          <ruby>学習<rt>がくしゅう</rt></ruby> 
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/quiz')} sx={{ fontSize: '16px' }} className='japanese-text'>
        <ruby>問題<rt>もんだい</rt></ruby>
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/simulation')} sx={{ fontSize: '16px' }} className='japanese-text'>
          シミュレーション
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/ai')} sx={{ fontSize: '16px' }} className='japanese-text'>
          <ruby>分析<rt>ぶんせき</rt></ruby>
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/config')} sx={{ fontSize: '16px' }} className='japanese-text'>
          <ruby>設定<rt>せってい</rt></ruby>
        </Button>
      </Box>

      {/* 外部リンク */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mt: 3 }} className='japanese-text'>
        <Button
          href="https://www.bousai.go.jp/"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
        >
          <ruby>内閣府<rt>ないかくふ</rt></ruby>の<ruby>防災情報<rt>ぼうさいじょうほう</rt></ruby>
        </Button>
        <Button
          href="https://www.jma.go.jp/jma/menu/menuflash.html"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
        >
          <ruby>気象庁<rt>きしょうちょう</rt></ruby>の<ruby>災害情報<rt>さいがいじょうほう</rt></ruby>
        </Button>
      </Box>
      <Typography sx={{textAlign: 'center'}} className='japanese-text'>
        <img src='/familly.png' alt='' width={448} height={256} />
      </Typography>
    </Box>
  );
}

export default Home;