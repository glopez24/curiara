// script.js
// Crear hojas decorativas
function createLeaves() {
  const jungle = document.getElementById('jungle-overlay');
  const leafChars = ['🍃', '🌿', '🌴', '🌱'];
  for (let i = 0; i < 15; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = leafChars[Math.floor(Math.random() * leafChars.length)];
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.top = `${Math.random() * 100}%`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    jungle.appendChild(leaf);
  }
}

// Datos del juego
const gameData = {
  points: 100,
  coins: 50,
  currentLevel: 1,
  maxUnlockedLevel: 1,
  exp: 0,
  expToNext: 1000,
  pronunciation: 0,
  vocabulary: 0,
  sentences: 0,
  // Actividades para cada nivel
  activities: [
    {
      title: "Repite después de mí",
      content: "Escucha y repite: 'La rana verde salta sobre la hoja grande'",
      example: "La rana verde salta sobre la hoja grande",
      difficulty: "Fácil",
      category: "Pronunciación"
    },
    {
      title: "Encuentra palabras con S",
      content: "Encuentra 3 palabras que empiezan con la letra 'S': sol, serpiente, sapo",
      example: "Sol, Serpiente, Sapo",
      difficulty: "Fácil",
      category: "Vocabulario"
    },
    {
      title: "Forma una oración",
      content: "Usa las palabras: 'mono', 'come', 'plátano' para formar una oración",
      example: "El mono come un plátano",
      difficulty: "Medio",
      category: "Oraciones"
    },
    {
      title: "Imita sonidos",
      content: "Imita el sonido del jaguar: 'Grrrrr'",
      example: "Grrrrr",
      difficulty: "Fácil",
      category: "Pronunciación"
    },
    {
      title: "Cuenta animales",
      content: "Cuenta 5 animales de la selva: mono, jaguar, serpiente, pájaro, sapo",
      example: "Mono, Jaguar, Serpiente, Pájaro, Sapo",
      difficulty: "Medio",
      category: "Vocabulario"
    },
    {
      title: "Describe un árbol",
      content: "Describe cómo es un árbol de la selva con 3 palabras: alto, verde, fuerte",
      example: "Alto, Verde, Fuerte",
      difficulty: "Medio",
      category: "Oraciones"
    },
    {
      title: "Canción de la lluvia",
      content: "Canta: 'Plin, plan, plin, plan, la lluvia cae en el río'",
      example: "Plin, plan, plin, plan, la lluvia cae en el río",
      difficulty: "Fácil",
      category: "Pronunciación"
    },
    {
      title: "Camina como un cangrejo",
      content: "Muestra con tus manos cómo camina un cangrejo y di: 'El cangrejo camina de lado'",
      example: "El cangrejo camina de lado",
      difficulty: "Medio",
      category: "Oraciones"
    },
    {
      title: "Nido de pájaro",
      content: "Dime qué hace un pájaro en su nido: 'El pájaro cuida a sus polluelos'",
      example: "El pájaro cuida a sus polluelos",
      difficulty: "Difícil",
      category: "Oraciones"
    },
    {
      title: "Historia de la selva",
      content: "Cuenta una historia corta de 3 oraciones sobre la selva",
      example: "En la selva vive un mono. El mono come plátanos. El mono es feliz.",
      difficulty: "Difícil",
      category: "Oraciones"
    }
  ],
  // Recompensas por nivel
  levelRewards: [
    { points: 10, coins: 5, exp: 100 },
    { points: 15, coins: 8, exp: 120 },
    { points: 20, coins: 10, exp: 150 },
    { points: 25, coins: 12, exp: 180 },
    { points: 30, coins: 15, exp: 220 },
    { points: 35, coins: 18, exp: 260 },
    { points: 40, coins: 20, exp: 300 },
    { points: 45, coins: 25, exp: 350 },
    { points: 50, coins: 30, exp: 400 },
    { points: 60, coins: 40, exp: 500 }
  ],
  // Progreso de habilidades por nivel
  skillProgress: [
    { pronunciation: 10, vocabulary: 8, sentences: 5 },
    { pronunciation: 12, vocabulary: 10, sentences: 8 },
    { pronunciation: 15, vocabulary: 12, sentences: 10 },
    { pronunciation: 18, vocabulary: 15, sentences: 12 },
    { pronunciation: 20, vocabulary: 18, sentences: 15 },
    { pronunciation: 22, vocabulary: 20, sentences: 18 },
    { pronunciation: 25, vocabulary: 22, sentences: 20 },
    { pronunciation: 28, vocabulary: 25, sentences: 22 },
    { pronunciation: 30, vocabulary: 28, sentences: 25 },
    { pronunciation: 35, vocabulary: 32, sentences: 30 }
  ],
  // Estado de pasos completados
  stepsCompleted: [false, false, false],
  // Mundo actual
  currentWorld: 1
};

// Actualizar puntos y monedas
function updateScore() {
  document.getElementById('points').textContent = gameData.points;
  document.getElementById('coins').textContent = gameData.coins;
}

// Crear el río serpenteante y los marcadores de nivel
function createRiverPath() {
  const riverPath = document.getElementById('river-path');
  const map = document.getElementById('map');
  
  // Definir los puntos del río serpenteante
  const riverPoints = [
    { x: 5, y: 50 },   // Inicio
    { x: 20, y: 30 },  // Curva 1
    { x: 35, y: 70 },  // Curva 2
    { x: 50, y: 40 },  // Curva 3
    { x: 65, y: 80 },  // Curva 4
    { x: 80, y: 50 },  // Curva 5
    { x: 95, y: 60 }   // Fin
  ];
  
  // Crear segmentos del río
  for (let i = 0; i < riverPoints.length - 1; i++) {
    const start = riverPoints[i];
    const end = riverPoints[i + 1];
    
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    const segment = document.createElement('div');
    segment.className = 'river-curve';
    segment.style.width = `${length}%`;
    segment.style.left = `${start.x}%`;
    segment.style.top = `${start.y}%`;
    segment.style.transform = `rotate(${angle}deg)`;
    segment.style.transformOrigin = '0 4px';
    
    riverPath.appendChild(segment);
  }
  
  // Crear marcadores de nivel a lo largo del río
  const numLevels = 10;
  for (let i = 1; i <= numLevels; i++) {
    const ratio = (i - 1) / (numLevels - 1);
    
    // Interpolación a lo largo de los puntos del río
    let x, y;
    if (ratio <= 0.166) {
      // Entre punto 0 y 1
      const t = ratio / 0.166;
      x = 5 + t * (20 - 5);
      y = 50 + t * (30 - 50);
    } else if (ratio <= 0.333) {
      // Entre punto 1 y 2
      const t = (ratio - 0.166) / 0.167;
      x = 20 + t * (35 - 20);
      y = 30 + t * (70 - 30);
    } else if (ratio <= 0.5) {
      // Entre punto 2 y 3
      const t = (ratio - 0.333) / 0.167;
      x = 35 + t * (50 - 35);
      y = 70 + t * (40 - 70);
    } else if (ratio <= 0.666) {
      // Entre punto 3 y 4
      const t = (ratio - 0.5) / 0.166;
      x = 50 + t * (65 - 50);
      y = 40 + t * (80 - 40);
    } else if (ratio <= 0.833) {
      // Entre punto 4 y 5
      const t = (ratio - 0.666) / 0.167;
      x = 65 + t * (80 - 65);
      y = 80 + t * (50 - 80);
    } else {
      // Entre punto 5 y 6
      const t = (ratio - 0.833) / 0.167;
      x = 80 + t * (95 - 80);
      y = 50 + t * (60 - 50);
    }
    
    const marker = document.createElement('div');
    marker.className = 'path-marker';
    marker.textContent = i;
    marker.dataset.level = i;
    
    marker.style.left = `calc(${x}% - 27px)`;
    marker.style.top = `calc(${y}% - 27px)`;
    
    // Actualizar estado del nivel
    updateLevelMarker(marker, i);
    
    // Evento de clic
    marker.addEventListener('click', () => openActivity(i));
    
    riverPath.appendChild(marker);
  }
  
  // Posicionar la canoa
  const canoe = document.getElementById('canoe');
  const firstMarker = document.querySelector('.path-marker[data-level="1"]');
  if (firstMarker) {
    canoe.style.left = firstMarker.style.left;
    canoe.style.top = `calc(${firstMarker.style.top} + 30px)`;
  }
}

// Actualizar estado de un marcador de nivel
function updateLevelMarker(marker, level) {
  if (level > gameData.maxUnlockedLevel) {
    marker.classList.remove('completed');
    marker.classList.add('locked');
    marker.style.cursor = 'not-allowed';
  } else if (level < gameData.maxUnlockedLevel) {
    marker.classList.remove('locked');
    marker.classList.add('completed');
    marker.style.cursor = 'pointer';
  } else {
    marker.classList.remove('completed', 'locked');
    marker.style.cursor = 'pointer';
  }
}

// Abrir modal con actividad
function openActivity(level) {
  const modal = document.getElementById('activity-modal');
  const title = document.getElementById('activity-title');
  const content = document.getElementById('activity-content');
  const levelInfo = document.getElementById('level-info');
  
  if (level > gameData.maxUnlockedLevel) {
    alert('¡Primero debes completar los niveles anteriores!');
    return;
  }
  
  const activity = gameData.activities[level - 1];
  title.textContent = `${activity.title}`;
  content.textContent = activity.content;
  levelInfo.textContent = `Nivel ${level} de 10 - ${activity.difficulty} - ${activity.category}`;
  
  // Resetear pasos completados
  gameData.stepsCompleted = [false, false, false];
  updateChecklist();
  
  modal.style.display = 'flex';
}

// Cerrar modales
function closeActivity() {
  document.getElementById('activity-modal').style.display = 'none';
}

function closeWorlds() {
  document.getElementById('worlds-modal').style.display = 'none';
}

function closeRewards() {
  document.getElementById('rewards-modal').style.display = 'none';
}

function closeProgress() {
  document.getElementById('progress-modal').style.display = 'none';
}

// Actualizar barra de progreso
function updateProgressBars() {
  const expPercent = (gameData.exp / gameData.expToNext) * 100;
  document.getElementById('exp-bar').style.width = `${expPercent}%`;
  document.getElementById('exp-text').textContent = `${gameData.exp}/${gameData.expToNext} puntos`;
  
  document.getElementById('current-level').textContent = gameData.currentLevel;
  document.getElementById('pronunciation').textContent = `${gameData.pronunciation}%`;
  document.getElementById('vocabulary').textContent = `${gameData.vocabulary}%`;
  document.getElementById('sentences').textContent = `${gameData.sentences}%`;
}

// Actualizar lista de verificación
function updateChecklist() {
  const steps = ['step1', 'step2', 'step3'];
  steps.forEach((step, index) => {
    const element = document.getElementById(step);
    if (element) {
      const icon = element.querySelector('i');
      if (gameData.stepsCompleted[index]) {
        icon.textContent = '✓';
        element.classList.add('completed');
      } else {
        icon.textContent = '○';
        element.classList.remove('completed');
      }
    }
  });
}

// Simular reproducción de ejemplo
function playExample() {
  const title = document.getElementById('activity-title').textContent;
  const levelMatch = title.match(/Nivel (\d+)/);
  const level = levelMatch ? parseInt(levelMatch[1]) : gameData.maxUnlockedLevel;
  const activity = gameData.activities[level - 1];
  
  alert(`🔊 Escuchando ejemplo del nivel ${level}:
"${activity.example}"`);
  
  // Marcar paso 1 como completado
  gameData.stepsCompleted[0] = true;
  updateChecklist();
}

// Simular grabación de voz
function recordVoice() {
  // Verificar que el paso 1 (escuchar) esté completado
  if (!gameData.stepsCompleted[0]) {
    alert('Primero debes escuchar el ejemplo antes de grabar tu voz.');
    return;
  }
  
  const recordAnimation = document.getElementById('record-animation');
  recordAnimation.style.display = 'block';
  
  // Simular grabación de 3 segundos
  setTimeout(() => {
    recordAnimation.style.display = 'none';
    
    // Mostrar resultado de la grabación
    const title = document.getElementById('activity-title').textContent;
    const levelMatch = title.match(/Nivel (\d+)/);
    const level = levelMatch ? parseInt(levelMatch[1]) : gameData.maxUnlockedLevel;
    
    const resultado = Math.random() > 0.3; // 70% de éxito
    
    if (resultado) {
      alert(`🎉 ¡Buena pronunciación! Tu voz se grabó correctamente.
Nivel ${level} completado con éxito.`);
      gameData.stepsCompleted[1] = true;
      gameData.stepsCompleted[2] = true;
    } else {
      alert(`🎯 Casi lo logras. Escucha nuevamente el ejemplo y practica un poco más.
Tu esfuerzo es importante.`);
      gameData.stepsCompleted[1] = true;
      gameData.stepsCompleted[2] = true;
    }
    
    updateChecklist();
  }, 3000);
}

// Completar actividad
function completeActivity() {
  // Verificar que todos los pasos estén completados
  if (!gameData.stepsCompleted[0]) {
    alert('Primero debes escuchar el ejemplo.');
    return;
  }
  
  if (!gameData.stepsCompleted[2]) {
    alert('Primero debes grabar tu voz para completar la actividad.');
    return;
  }
  
  const currentLevel = parseInt(document.querySelector('#activity-title').textContent.match(/Nivel (\d+)/)?.[1] || gameData.maxUnlockedLevel);
  const rewards = gameData.levelRewards[currentLevel - 1];
  
  // Actualizar puntos, monedas y experiencia
  gameData.points += rewards.points;
  gameData.coins += rewards.coins;
  gameData.exp += rewards.exp;
  
  // Actualizar habilidades
  gameData.pronunciation += gameData.skillProgress[currentLevel - 1].pronunciation;
  gameData.vocabulary += gameData.skillProgress[currentLevel - 1].vocabulary;
  gameData.sentences += gameData.skillProgress[currentLevel - 1].sentences;
  
  // Limitar habilidades al 100%
  gameData.pronunciation = Math.min(gameData.pronunciation, 100);
  gameData.vocabulary = Math.min(gameData.vocabulary, 100);
  gameData.sentences = Math.min(gameData.sentences, 100);
  
  // Subir de nivel si es necesario
  if (gameData.exp >= gameData.expToNext) {
    gameData.currentLevel++;
    gameData.exp = 0;
    gameData.expToNext = Math.floor(gameData.expToNext * 1.5);
    gameData.points += 25; // Recompensa por subir de nivel
    alert(`¡Felicidades! Has subido al nivel ${gameData.currentLevel}`);
  }
  
  // Desbloquear siguiente nivel
  if (currentLevel === gameData.maxUnlockedLevel) {
    gameData.maxUnlockedLevel = Math.min(gameData.maxUnlockedLevel + 1, 10);
  }
  
  updateScore();
  updateProgressBars();
  closeActivity();
  
  // Actualizar marcadores de nivel
  const markers = document.querySelectorAll('.path-marker');
  markers.forEach((marker, index) => {
    updateLevelMarker(marker, index + 1);
  });
  
  // Mover la canoa al siguiente nivel
  const canoe = document.getElementById('canoe');
  const nextMarker = document.querySelector(`.path-marker[data-level="${Math.min(currentLevel + 1, 10)}"]`);
  if (nextMarker) {
    canoe.style.transition = 'top 0.5s ease, left 0.5s ease';
    canoe.style.left = nextMarker.style.left;
    canoe.style.top = `calc(${nextMarker.style.top} + 30px)`;
  }
  
  alert(`¡Nivel ${currentLevel} completado!
+${rewards.points} puntos
+${rewards.coins} monedas
+${rewards.exp} experiencia`);
}

// Canjear recompensa
function redeemReward(cost) {
  if (gameData.coins >= cost) {
    gameData.coins -= cost;
    updateScore();
    alert('¡Recompensa canjeada con éxito! Pronto la recibirás.');
  } else {
    alert('No tienes suficientes monedas para canjear esta recompensa.');
  }
}

// Cambiar a un mundo específico
function changeWorld(worldId) {
  const worldModals = {
    1: 'world-1-modal',
    2: 'world-2-modal',
    3: 'world-3-modal',
    4: 'world-4-modal'
  };
  
  // Cerrar el modal de mundos
  document.getElementById('worlds-modal').style.display = 'none';
  
  // Mostrar el modal del mundo seleccionado
  document.getElementById(worldModals[worldId]).style.display = 'flex';
  
  // Actualizar el mundo actual
  gameData.currentWorld = worldId;
  
  // Actualizar la interfaz según el mundo
  updateInterfaceForWorld(worldId);
}

// Actualizar interfaz según el mundo
function updateInterfaceForWorld(worldId) {
  const body = document.body;
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const riverCurves = document.querySelectorAll('.river-curve');
  const canoe = document.getElementById('canoe');
  
  // Aplicar estilos según el mundo
  switch(worldId) {
    case 1: // Selva Profunda
      body.style.background = 'linear-gradient(to bottom, #2E7D32, #1B5E20)';
      riverCurves.forEach(curve => {
        curve.style.background = 'linear-gradient(90deg, transparent, #8BC34A, transparent)';
        curve.style.boxShadow = '0 0 15px rgba(139, 195, 74, 0.6), inset 0 0 20px rgba(139, 195, 74, 0.8)';
      });
      canoe.style.background = '#5D4037';
      break;
      
    case 2: // Ríos y Cauces
      body.style.background = 'linear-gradient(to bottom, #0D47A1, #1565C0)';
      riverCurves.forEach(curve => {
        curve.style.background = 'linear-gradient(90deg, transparent, #42A5F5, transparent)';
        curve.style.boxShadow = '0 0 15px rgba(66, 165, 245, 0.6), inset 0 0 20px rgba(66, 165, 245, 0.8)';
      });
      canoe.style.background = '#8D6E63';
      break;
      
    case 3: // Claros del Bosque
      body.style.background = 'linear-gradient(to bottom, #F57F17, #FFA000)';
      riverCurves.forEach(curve => {
        curve.style.background = 'linear-gradient(90deg, transparent, #FFC107, transparent)';
        curve.style.boxShadow = '0 0 15px rgba(255, 193, 7, 0.6), inset 0 0 20px rgba(255, 193, 7, 0.8)';
      });
      canoe.style.background = '#5D4037';
      break;
      
    case 4: // Lluvias Tropicales
      body.style.background = 'linear-gradient(to bottom, #263238, #37474F)';
      riverCurves.forEach(curve => {
        curve.style.background = 'linear-gradient(90deg, transparent, #90A4AE, transparent)';
        curve.style.boxShadow = '0 0 15px rgba(144, 164, 174, 0.6), inset 0 0 20px rgba(144, 164, 174, 0.8)';
      });
      canoe.style.background = '#795548';
      break;
  }
  
  // Mostrar mensaje de bienvenida
  setTimeout(() => {
    const worldNames = ['Selva Profunda', 'Ríos y Cauces', 'Claros del Bosque', 'Lluvias Tropicales'];
    alert(`¡Bienvenido al mundo de la ${worldNames[worldId-1]}!`);
  }, 500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  createLeaves();
  updateScore();
  createRiverPath();
  updateProgressBars();
  
  // Botón de jugar - abre el primer nivel disponible
  document.getElementById('play-btn').addEventListener('click', function() {
    openActivity(gameData.maxUnlockedLevel);
  });
  
  // Botón de mundos
  document.getElementById('worlds-btn').addEventListener('click', function() {
    document.getElementById('worlds-modal').style.display = 'flex';
  });
  
  // Botón de recompensas
  document.getElementById('rewards-btn').addEventListener('click', function() {
    document.getElementById('rewards-modal').style.display = 'flex';
  });
  
  // Botón de progreso
  document.getElementById('progress-btn').addEventListener('click', function() {
    document.getElementById('progress-modal').style.display = 'flex';
  });
  
  // Cerrar modales con X
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal.id !== 'worlds-modal') {
        modal.style.display = 'none';
      }
    });
  });
  
  // Cerrar modales con botones
  document.querySelector('.close-worlds').addEventListener('click', closeWorlds);
  document.querySelector('.close-rewards').addEventListener('click', closeRewards);
  document.querySelector('.close-progress').addEventListener('click', closeProgress);
  
  // Canjear recompensas
  document.querySelectorAll('#rewards-list button').forEach(btn => {
    btn.addEventListener('click', function() {
      redeemReward(parseInt(this.dataset.cost));
    });
  });
  
  // Seleccionar mundo
  document.querySelectorAll('.world-item').forEach(item => {
    item.addEventListener('click', function() {
      const world = parseInt(this.dataset.world);
      changeWorld(world);
    });
  });
  
  // Botones para entrar a mundos específicos
  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`start-world-${i}`);
    if (btn) {
      btn.addEventListener('click', function() {
        document.getElementById(`world-${i}-modal`).style.display = 'none';
      });
    }
  }
  
  // Reproducir ejemplo
  document.getElementById('play-example').addEventListener('click', playExample);
  
  // Grabar voz
  document.getElementById('record-btn').addEventListener('click', recordVoice);
  
  // Completar actividad
  document.getElementById('complete-activity').addEventListener('click', completeActivity);
  
  // Cerrar modal al hacer clic fuera
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this && this.id !== 'worlds-modal') {
        this.style.display = 'none';
      }
    });
  });
});