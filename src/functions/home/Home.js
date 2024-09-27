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
    <Box sx={{ padding: '0 23rem' }}>

      <Typography variant='h4' gutterBottom textAlign={'center'}>
      <ruby>目指<rt>めざ</rt>せ！Disaster Master</ruby>
      </Typography>
      
      {/* 学習達成率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={achievementRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography><ruby>学習達成率<rt>がくしゅうたっせいりつ</rt></ruby>: {achievementRate}%</Typography>
      </Box>

      {/* クイズ正答率バー */}
      <Box sx={{ my: 2 }}>
        <LinearProgress variant="determinate" value={quizAccuracyRate} sx={{ height: '20px', borderRadius: '10px' }} />
        <Typography>クイズ<ruby>正答率<rt>せいとうりつ</rt></ruby>: {quizAccuracyRate}%</Typography>
      </Box>

      {/* 各ページへのリンクボタン */}
      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/learning')}>
          <ruby>学習<rt>がくしゅう</rt></ruby>
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/quiz')}>
          クイズ
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/simulation')}>
          シミュレーション
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/ai')}>
          AI<ruby>画像分析<rt>がぞうぶんせき</rt></ruby>
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/app/config')}>
          <ruby>設定<rt>せってい</rt></ruby>
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
      <Typography sx={{textAlign: 'center'}}>
        <img src='/familly.png' alt='' width={448} height={256} />
      </Typography>
    </Box>
  );
}

export default Home;