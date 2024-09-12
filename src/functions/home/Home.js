import React, { useState } from 'react';
import { useQuizStats } from '../quiz/useQuizStats'; // カスタムフックをインポート
import useLearningStats from '../learning/useLearningStats';
import { Button, Typography, Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const quizStats = useQuizStats(); // カスタムフックを使用
  const quizAccuracyRate = quizStats.accuracyRate
  const { achievementRate } = useLearningStats();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '2rem'}}>
      <Typography variant='h4' gutterBottom textAlign={'center'}>
        目指せ！Disaster Master！
      </Typography>
      
      {/* 学習達成率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={achievementRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography>学習達成率: {achievementRate}%</Typography>
      </Box>

      {/* クイズ正答率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={quizAccuracyRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography>クイズ正答率: {quizAccuracyRate}%</Typography>
      </Box>

      {/* 各ページへのリンクボタン */}
      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/learning')}>
          学習
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/quiz')}>
          クイズ
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/simulation')}>
          シミュレーション
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/ai')}>
          AI画像分析
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/config')}>
          設定
        </Button>
      </Box>

      {/* 外部リンク */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mt: 3 }}>
        <Button
          href="https://www.bousai.go.jp/"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
        >
          内閣府の防災情報
        </Button>
        <Button
          href="https://www.jma.go.jp/jma/menu/menuflash.html"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="secondary"
        >
          気象庁の災害情報
        </Button>
      </Box>
      <Typography sx={{textAlign: 'center'}}>
        <img src='/backgroundimage.png' alt='' width={448} height={256} />
      </Typography>
    </Box>
  );
}

export default Home;