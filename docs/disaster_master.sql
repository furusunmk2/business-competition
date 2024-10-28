-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2024-10-28 01:44:09
-- サーバのバージョン： 10.4.32-MariaDB
-- PHP のバージョン: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `disaster_master`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `learning_materials`
--

CREATE TABLE `learning_materials` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `learning_materials`
--

INSERT INTO `learning_materials` (`id`, `title`, `content`, `type`, `created_at`, `updated_at`) VALUES
(1, '地震の基本知識', '地震は、地球内部のプレートの動きや火山活動によって発生する自然現象です。地殻の内部で起こる応力の解放により、地震波が発生し、地面が揺れます。地震の強さは震源地の深さや距離、地盤の状態によって異なります。地震の影響で建物が倒壊することもあり、その被害を最小限に抑えるためには、地震の前に適切な備えが必要です。例えば、家具の固定や非常用の持ち出し袋の準備、避難場所の確認などが有効です。また、地震の際には揺れが収まるまで安全な場所に留まり、火やガスの取り扱いにも注意することが重要です。日頃から地震に対する意識を高め、災害発生時に冷静に行動できるようにしましょう。', NULL, '2024-09-05 04:31:20', '2024-09-19 05:00:21'),
(2, '地震発生時の行動マニュアル', '地震が発生した場合、まずは「まず身を守る」ことが最優先です。揺れを感じたら、まずは低い姿勢をとり、頭を守るために両手でしっかり覆いましょう。机の下に隠れるのが最も安全ですが、机がない場合は、壁の隅や窓から遠い場所に移動することも考えましょう。揺れが収まった後は、慌てて外に飛び出さず、まずは周囲の安全を確認しましょう。ガラスや家具が倒れていないか確認し、火災やガス漏れに注意が必要です。避難が必要な場合は、事前に確認しておいた避難経路や避難所に向かいましょう。地震後には余震が続くことがありますので、引き続き注意が必要です。また、避難中や避難後も情報収集を怠らず、公式の指示に従うことが重要です。安全が確保されたら、家族や友人の安否確認も忘れずに行いましょう。', NULL, '2024-09-05 04:31:51', '2024-09-05 04:31:51'),
(3, '台風の対策と安全行動', '台風は強風と大雨を伴う自然災害で、沿岸部や広範囲にわたる影響を及ぼします。台風の接近が予想される際には、事前に準備を行うことが重要です。まずは、台風情報をこまめに確認し、避難指示や警報に従いましょう。家の周りの点検を行い、飛ばされやすい物や、雨漏りの原因になる物は片付けておきます。また、窓やドアに補強を施し、強風による破損を防ぐことが大切です。台風の直撃が避けられない場合は、安全な場所に避難し、停電に備えて非常用のライトや充電器、食料や水などを準備しておきましょう。風や雨の音が激しくなる場合は、家の中の安全な場所に移動し、窓から離れて過ごすことをおすすめします。台風が通過した後も、周囲の状況を確認し、倒木や冠水などの危険を避けながら、必要な救助や支援を求めましょう。安全が確認できるまで外出は控え、状況が改善するのを待つことが重要です。', NULL, '2024-09-05 04:32:17', '2024-09-05 04:32:17');

-- --------------------------------------------------------

--
-- テーブルの構造 `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `question` text DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `question`, `explanation`, `created_at`, `updated_at`) VALUES
(1, '地震問題①', '自宅にいるときに突然の地震が発生。まずすべきことは？', 'これは解説文です①', '2024-07-11 04:17:41', '2024-07-11 06:22:30'),
(2, '地震問題②', '揺れがおさまりました。次にすべきことは？', 'これは解説文です②', '2024-07-11 06:09:30', '2024-07-11 06:17:18'),
(3, '地震問題③', '避難するときの服装として正しいものは？', 'これは解説文です③', '2024-07-11 06:38:55', '2024-07-11 06:40:08');

-- --------------------------------------------------------

--
-- テーブルの構造 `quiz_choices`
--

CREATE TABLE `quiz_choices` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `choice` text NOT NULL,
  `is_answer` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- テーブルのデータのダンプ `quiz_choices`
--

INSERT INTO `quiz_choices` (`id`, `quiz_id`, `choice`, `is_answer`, `created_at`, `updated_at`) VALUES
(1, 1, 'まずはテーブルの下などに隠れて身の安全を確保する', 1, '2024-07-11 04:18:20', '2024-07-11 06:11:21'),
(2, 1, 'コンロに火をつけたままだったため急いでコンロの火を消す', 0, '2024-07-11 04:19:01', '2024-07-11 06:11:25'),
(3, 2, '一度冷静になって身だしなみを整える', 0, '2024-07-11 04:19:22', '2024-07-11 06:10:36'),
(4, 2, '非常持ち出し袋をもって急いで外に逃げる', 1, '2024-07-11 06:11:02', '2024-07-11 06:11:02'),
(5, 3, '夏でも長袖や長ズボンを着て肌を出さないようにして避難する', 1, '2024-07-11 06:39:46', '2024-07-11 06:39:46'),
(6, 3, 'なるべく身軽で動きやすい服装で避難する', 0, '2024-07-11 06:39:57', '2024-07-11 06:39:57');

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_answers`
--

CREATE TABLE `user_answers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `choice_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `answered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `user_material_views`
--

CREATE TABLE `user_material_views` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL,
  `learned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `learning_materials`
--
ALTER TABLE `learning_materials`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `quiz_choices`
--
ALTER TABLE `quiz_choices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- テーブルのインデックス `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `choice_id` (`choice_id`),
  ADD KEY `user_answers_ibfk_1` (`user_id`);

--
-- テーブルのインデックス `user_material_views`
--
ALTER TABLE `user_material_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `material_id` (`material_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `learning_materials`
--
ALTER TABLE `learning_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `quiz_choices`
--
ALTER TABLE `quiz_choices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- テーブルの AUTO_INCREMENT `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- テーブルの AUTO_INCREMENT `user_material_views`
--
ALTER TABLE `user_material_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `quiz_choices`
--
ALTER TABLE `quiz_choices`
  ADD CONSTRAINT `quiz_choices_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_answers_ibfk_3` FOREIGN KEY (`choice_id`) REFERENCES `quiz_choices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `user_material_views`
--
ALTER TABLE `user_material_views`
  ADD CONSTRAINT `user_material_views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_material_views_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `learning_materials` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
