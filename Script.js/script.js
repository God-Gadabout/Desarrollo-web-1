        // Estado del cubo - representado como 6 caras de 3x3
        let cubeState = {
            front: Array(9).fill('white'),
            back: Array(9).fill('yellow'),
            right: Array(9).fill('red'),
            left: Array(9).fill('orange'),
            top: Array(9).fill('blue'),
            bottom: Array(9).fill('green')
        };
        
        let moveCount = 0;
        let isRotating = false;
        
        // Inicializar el cubo
        function initCube() {
            Object.keys(cubeState).forEach(face => {
                const faceElement = document.querySelector(`.face.${face}`);
                faceElement.innerHTML = '';
                
                for (let i = 0; i < 9; i++) {
                    const sticker = document.createElement('div');
                    sticker.className = `sticker ${cubeState[face][i]}`;
                    faceElement.appendChild(sticker);
                }
            });
            
            updateMoveCounter();
        }
        
        // Actualizar contador de movimientos
        function updateMoveCounter() {
            document.getElementById('moveCounter').textContent = `Movimientos: ${moveCount}`;
        }
        
        // Rotar una cara
        function rotateFace(face, direction) {
            if (isRotating) return;
            isRotating = true;
            
            moveCount++;
            updateMoveCounter();
            
            // Rotar la cara en sí misma
            const temp = [...cubeState[face]];
            
            if (direction === 1) { // Horario
                cubeState[face] = [
                    temp[6], temp[3], temp[0],
                    temp[7], temp[4], temp[1],
                    temp[8], temp[5], temp[2]
                ];
            } else { // Antihorario
                cubeState[face] = [
                    temp[2], temp[5], temp[8],
                    temp[1], temp[4], temp[7],
                    temp[0], temp[3], temp[6]
                ];
            }
            
            // Rotar las piezas adyacentes
            rotateAdjacentPieces(face, direction);
            
            // Actualizar visualización
            setTimeout(() => {
                initCube();
                isRotating = false;
            }, 50);
        }
        
        // Rotar piezas adyacentes
        function rotateAdjacentPieces(face, direction) {
            let temp;
            
            if (face === 'front') {
                temp = [
                    cubeState.top[6], cubeState.top[7], cubeState.top[8]
                ];
                
                if (direction === 1) {
                    cubeState.top[6] = cubeState.left[8];
                    cubeState.top[7] = cubeState.left[5];
                    cubeState.top[8] = cubeState.left[2];
                    
                    cubeState.left[2] = cubeState.bottom[0];
                    cubeState.left[5] = cubeState.bottom[1];
                    cubeState.left[8] = cubeState.bottom[2];
                    
                    cubeState.bottom[0] = cubeState.right[6];
                    cubeState.bottom[1] = cubeState.right[3];
                    cubeState.bottom[2] = cubeState.right[0];
                    
                    cubeState.right[0] = temp[0];
                    cubeState.right[3] = temp[1];
                    cubeState.right[6] = temp[2];
                } else {
                    cubeState.top[6] = cubeState.right[0];
                    cubeState.top[7] = cubeState.right[3];
                    cubeState.top[8] = cubeState.right[6];
                    
                    cubeState.right[0] = cubeState.bottom[2];
                    cubeState.right[3] = cubeState.bottom[1];
                    cubeState.right[6] = cubeState.bottom[0];
                    
                    cubeState.bottom[0] = cubeState.left[2];
                    cubeState.bottom[1] = cubeState.left[5];
                    cubeState.bottom[2] = cubeState.left[8];
                    
                    cubeState.left[2] = temp[2];
                    cubeState.left[5] = temp[1];
                    cubeState.left[8] = temp[0];
                }
            } else if (face === 'back') {
                temp = [
                    cubeState.top[0], cubeState.top[1], cubeState.top[2]
                ];
                
                if (direction === 1) {
                    cubeState.top[0] = cubeState.right[2];
                    cubeState.top[1] = cubeState.right[5];
                    cubeState.top[2] = cubeState.right[8];
                    
                    cubeState.right[2] = cubeState.bottom[8];
                    cubeState.right[5] = cubeState.bottom[7];
                    cubeState.right[8] = cubeState.bottom[6];
                    
                    cubeState.bottom[6] = cubeState.left[0];
                    cubeState.bottom[7] = cubeState.left[3];
                    cubeState.bottom[8] = cubeState.left[6];
                    
                    cubeState.left[0] = temp[2];
                    cubeState.left[3] = temp[1];
                    cubeState.left[6] = temp[0];
                } else {
                    cubeState.top[0] = cubeState.left[6];
                    cubeState.top[1] = cubeState.left[3];
                    cubeState.top[2] = cubeState.left[0];
                    
                    cubeState.left[0] = cubeState.bottom[6];
                    cubeState.left[3] = cubeState.bottom[7];
                    cubeState.left[6] = cubeState.bottom[8];
                    
                    cubeState.bottom[6] = cubeState.right[8];
                    cubeState.bottom[7] = cubeState.right[5];
                    cubeState.bottom[8] = cubeState.right[2];
                    
                    cubeState.right[2] = temp[0];
                    cubeState.right[5] = temp[1];
                    cubeState.right[8] = temp[2];
                }
            } else if (face === 'right') {
                temp = [
                    cubeState.front[2], cubeState.front[5], cubeState.front[8]
                ];
                
                if (direction === 1) {
                    cubeState.front[2] = cubeState.bottom[2];
                    cubeState.front[5] = cubeState.bottom[5];
                    cubeState.front[8] = cubeState.bottom[8];
                    
                    cubeState.bottom[2] = cubeState.back[6];
                    cubeState.bottom[5] = cubeState.back[3];
                    cubeState.bottom[8] = cubeState.back[0];
                    
                    cubeState.back[0] = cubeState.top[8];
                    cubeState.back[3] = cubeState.top[5];
                    cubeState.back[6] = cubeState.top[2];
                    
                    cubeState.top[2] = temp[0];
                    cubeState.top[5] = temp[1];
                    cubeState.top[8] = temp[2];
                } else {
                    cubeState.front[2] = cubeState.top[2];
                    cubeState.front[5] = cubeState.top[5];
                    cubeState.front[8] = cubeState.top[8];
                    
                    cubeState.top[2] = cubeState.back[6];
                    cubeState.top[5] = cubeState.back[3];
                    cubeState.top[8] = cubeState.back[0];
                    
                    cubeState.back[0] = cubeState.bottom[8];
                    cubeState.back[3] = cubeState.bottom[5];
                    cubeState.back[6] = cubeState.bottom[2];
                    
                    cubeState.bottom[2] = temp[0];
                    cubeState.bottom[5] = temp[1];
                    cubeState.bottom[8] = temp[2];
                }
            } else if (face === 'left') {
                temp = [
                    cubeState.front[0], cubeState.front[3], cubeState.front[6]
                ];
                
                if (direction === 1) {
                    cubeState.front[0] = cubeState.top[0];
                    cubeState.front[3] = cubeState.top[3];
                    cubeState.front[6] = cubeState.top[6];
                    
                    cubeState.top[0] = cubeState.back[8];
                    cubeState.top[3] = cubeState.back[5];
                    cubeState.top[6] = cubeState.back[2];
                    
                    cubeState.back[2] = cubeState.bottom[6];
                    cubeState.back[5] = cubeState.bottom[3];
                    cubeState.back[8] = cubeState.bottom[0];
                    
                    cubeState.bottom[0] = temp[0];
                    cubeState.bottom[3] = temp[1];
                    cubeState.bottom[6] = temp[2];
                } else {
                    cubeState.front[0] = cubeState.bottom[0];
                    cubeState.front[3] = cubeState.bottom[3];
                    cubeState.front[6] = cubeState.bottom[6];
                    
                    cubeState.bottom[0] = cubeState.back[8];
                    cubeState.bottom[3] = cubeState.back[5];
                    cubeState.bottom[6] = cubeState.back[2];
                    
                    cubeState.back[2] = cubeState.top[6];
                    cubeState.back[5] = cubeState.top[3];
                    cubeState.back[8] = cubeState.top[0];
                    
                    cubeState.top[0] = temp[0];
                    cubeState.top[3] = temp[1];
                    cubeState.top[6] = temp[2];
                }
            } else if (face === 'top') {
                temp = [
                    cubeState.front[0], cubeState.front[1], cubeState.front[2]
                ];
                
                if (direction === 1) {
                    cubeState.front[0] = cubeState.right[0];
                    cubeState.front[1] = cubeState.right[1];
                    cubeState.front[2] = cubeState.right[2];
                    
                    cubeState.right[0] = cubeState.back[0];
                    cubeState.right[1] = cubeState.back[1];
                    cubeState.right[2] = cubeState.back[2];
                    
                    cubeState.back[0] = cubeState.left[0];
                    cubeState.back[1] = cubeState.left[1];
                    cubeState.back[2] = cubeState.left[2];
                    
                    cubeState.left[0] = temp[0];
                    cubeState.left[1] = temp[1];
                    cubeState.left[2] = temp[2];
                } else {
                    cubeState.front[0] = cubeState.left[0];
                    cubeState.front[1] = cubeState.left[1];
                    cubeState.front[2] = cubeState.left[2];
                    
                    cubeState.left[0] = cubeState.back[0];
                    cubeState.left[1] = cubeState.back[1];
                    cubeState.left[2] = cubeState.back[2];
                    
                    cubeState.back[0] = cubeState.right[0];
                    cubeState.back[1] = cubeState.right[1];
                    cubeState.back[2] = cubeState.right[2];
                    
                    cubeState.right[0] = temp[0];
                    cubeState.right[1] = temp[1];
                    cubeState.right[2] = temp[2];
                }
            } else if (face === 'bottom') {
                temp = [
                    cubeState.front[6], cubeState.front[7], cubeState.front[8]
                ];
                
                if (direction === 1) {
                    cubeState.front[6] = cubeState.left[6];
                    cubeState.front[7] = cubeState.left[7];
                    cubeState.front[8] = cubeState.left[8];
                    
                    cubeState.left[6] = cubeState.back[6];
                    cubeState.left[7] = cubeState.back[7];
                    cubeState.left[8] = cubeState.back[8];
                    
                    cubeState.back[6] = cubeState.right[6];
                    cubeState.back[7] = cubeState.right[7];
                    cubeState.back[8] = cubeState.right[8];
                    
                    cubeState.right[6] = temp[0];
                    cubeState.right[7] = temp[1];
                    cubeState.right[8] = temp[2];
                } else {
                    cubeState.front[6] = cubeState.right[6];
                    cubeState.front[7] = cubeState.right[7];
                    cubeState.front[8] = cubeState.right[8];
                    
                    cubeState.right[6] = cubeState.back[6];
                    cubeState.right[7] = cubeState.back[7];
                    cubeState.right[8] = cubeState.back[8];
                    
                    cubeState.back[6] = cubeState.left[6];
                    cubeState.back[7] = cubeState.left[7];
                    cubeState.back[8] = cubeState.left[8];
                    
                    cubeState.left[6] = temp[0];
                    cubeState.left[7] = temp[1];
                    cubeState.left[8] = temp[2];
                }
            }
        }
        
        // Mezclar el cubo
        function scrambleCube() {
            const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
            const directions = [1, -1];
            const scrambleMoves = 25;
            
            moveCount = 0;
            
            for (let i = 0; i < scrambleMoves; i++) {
                const randomFace = faces[Math.floor(Math.random() * faces.length)];
                const randomDirection = directions[Math.floor(Math.random() * directions.length)];
                
                const temp = [...cubeState[randomFace]];
                
                if (randomDirection === 1) {
                    cubeState[randomFace] = [
                        temp[6], temp[3], temp[0],
                        temp[7], temp[4], temp[1],
                        temp[8], temp[5], temp[2]
                    ];
                } else {
                    cubeState[randomFace] = [
                        temp[2], temp[5], temp[8],
                        temp[1], temp[4], temp[7],
                        temp[0], temp[3], temp[6]
                    ];
                }
                
                rotateAdjacentPieces(randomFace, randomDirection);
            }
            
            initCube();
        }
        
        // Reiniciar el cubo
        function resetCube() {
            cubeState = {
                front: Array(9).fill('white'),
                back: Array(9).fill('yellow'),
                right: Array(9).fill('red'),
                left: Array(9).fill('orange'),
                top: Array(9).fill('blue'),
                bottom: Array(9).fill('green')
            };
            
            moveCount = 0;
            initCube();
        }
        
        // Rotación con el mouse
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotation = { x: -25, y: 35 };
        
        const cube = document.getElementById('cube');
        const cubeContainer = document.getElementById('cubeContainer');
        
        cubeContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            cube.classList.add('rotating');
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;
            
            rotation.y += deltaX * 0.5;
            rotation.x -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                cube.classList.remove('rotating');
            }
        });
        
        // Touch events para móviles
        cubeContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            const touch = e.touches[0];
            previousMousePosition = { x: touch.clientX, y: touch.clientY };
            cube.classList.add('rotating');
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - previousMousePosition.x;
            const deltaY = touch.clientY - previousMousePosition.y;
            
            rotation.y += deltaX * 0.5;
            rotation.x -= deltaY * 0.5;
            
            cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
            
            previousMousePosition = { x: touch.clientX, y: touch.clientY };
        });
        
        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                cube.classList.remove('rotating');
            }
        });
        
        // Crear partículas de fondo
        function createParticles() {
            const colors = ['#00ffff', '#ff00ff', '#ffff00'];
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
                document.body.appendChild(particle);
            }
        }
        
        // Inicializar todo
        createParticles();
        initCube();