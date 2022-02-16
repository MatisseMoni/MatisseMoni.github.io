const gltfLoader = new THREE.GLTFLoader();
const texture = new THREE.TextureLoader()

//values Planetes
var valeursPlanetes;
ROTATION_DELTA = 1


fetch("./valeurs.json")
    .then(response => {
        return response.json();
    }).then(valeursPlanetes => {
        valeursPlanetes = valeursPlanetes["Planetes"]
            //scene
        const scene = new THREE.Scene();
        scene.background = texture.load('textures/univers.jpg')
            //camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.y = 100;

        //renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //OrbitControls
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        //light
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        //System Solaire
        var Planets = [];
        var axisPlanets = [];

        //Axis
        var gAxis = new THREE.SphereGeometry(0, 0, 0);
        var mAxis = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });

        //Soleil
        var mSoleil = new THREE.MeshBasicMaterial({
            map: texture.load("textures/sunmap.jpg")
        });
        var gSoleil = new THREE.SphereGeometry(Math.log10(valeursPlanetes[9]["diametre"]), 360, 360);
        Soleil = new THREE.Mesh(gSoleil, mSoleil);
        Soleil.geometry.computeVertexNormals(true);

        //Mercure
        var AxisMercure = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMercure);
        axisPlanets.push(AxisMercure);

        var mMercure = new THREE.MeshBasicMaterial({
            map: texture.load("textures/mercurymap.jpg"),
        });
        mMercure.bumpMap = texture.load('textures/mercurybump.jpg');
        var gMercure = new THREE.SphereGeometry(Math.log10(valeursPlanetes[0]["diametre"]), 360, 360);
        Mercure = new THREE.Mesh(gMercure, mMercure);
        Mercure.geometry.computeVertexNormals(true);
        AxisMercure.add(Mercure);
        Planets.push(Mercure);

        //Vénus
        var AxisVenus = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisVenus);
        axisPlanets.push(AxisVenus);

        var mVenus = new THREE.MeshBasicMaterial({
            map: texture.load("textures/venusmap.jpg")
        });
        mVenus.bumpMap = texture.load('textures/venusbump.jpg');
        var gVenus = new THREE.SphereGeometry(Math.log10(valeursPlanetes[1]["diametre"]), 360, 360);
        Venus = new THREE.Mesh(gVenus, mVenus);
        Venus.geometry.computeVertexNormals(true);
        AxisVenus.add(Venus);
        Planets.push(Venus);

        //Terre
        var AxisTerre = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisTerre);
        axisPlanets.push(AxisTerre);

        var mTerre = new THREE.MeshBasicMaterial({
            map: texture.load('textures/earthmap1k.jpg')
        });
        mTerre.bumpMap = texture.load('textures/earthbump1k.jpg');
        mTerre.specularMap = texture.load('textures/earthspec1k.jpg');
        mTerre.specular = new THREE.Color('grey');
        mTerre.bumpScale = 0.05;
        var gTerre = new THREE.SphereGeometry(Math.log10(valeursPlanetes[2]["diametre"]), 360, 360);
        Terre = new THREE.Mesh(gTerre, mTerre);
        Terre.geometry.computeVertexNormals(true);
        AxisTerre.add(Terre);
        Planets.push(Terre);

        //Mars
        var AxisMars = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMars);
        axisPlanets.push(AxisMars);

        var mMars = new THREE.MeshBasicMaterial({
            map: texture.load('textures/mars_1k_color.jpg'),
        });
        mMars.bumpMap = texture.load('textures/mars_1k_topo.jpg');
        mMars.specularMap = texture.load('textures/mars_1k_normal.jpg');
        mMars.specular = new THREE.Color('grey');
        mMars.bumpScale = 0.05;
        var gMars = new THREE.SphereGeometry(Math.log10(valeursPlanetes[3]["diametre"]), 360, 360);
        Mars = new THREE.Mesh(gMars, mMars);
        Mars.geometry.computeVertexNormals(true);
        AxisMars.add(Mars);
        Planets.push(Mars);

        //Jupiter
        var AxisJupiter = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisJupiter);
        axisPlanets.push(AxisJupiter);


        var mJupiter = new THREE.MeshBasicMaterial({
            map: texture.load('textures/jupiter2_1k.jpg')
        });
        var gJupiter = new THREE.SphereGeometry(Math.log10(valeursPlanetes[4]["diametre"]), 360, 360);
        Jupiter = new THREE.Mesh(gJupiter, mJupiter);
        Jupiter.geometry.computeVertexNormals(true);
        AxisJupiter.add(Jupiter);
        Planets.push(Jupiter);

        //Saturne
        var AxisSaturne = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisSaturne);
        axisPlanets.push(AxisSaturne);


        var mSaturne = new THREE.MeshBasicMaterial({
            map: texture.load('textures/saturnmap.jpg')
        });
        var gSaturne = new THREE.SphereGeometry(Math.log10(valeursPlanetes[5]["diametre"]), 360, 360);
        Saturne = new THREE.Mesh(gSaturne, mSaturne);
        Saturne.geometry.computeVertexNormals(true);
        AxisSaturne.add(Saturne);
        Planets.push(Saturne);

        //Saturne Ring
        console.log((Math.log10(valeursPlanetes[5]["diametre"]) + 1.2))
        const gRingSaturne = new THREE.RingBufferGeometry(Math.log10(valeursPlanetes[5]["diametre"]), Math.log10(valeursPlanetes[5]["diametre"]), 360, 20);
        const mRingSaturne = new THREE.MeshBasicMaterial({
            map: texture.load('textures/saturnringcolor.png'),
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true
        });
        mRingSaturne.bumpMap = texture.load('textures/saturnringpattern.gif')

        const RingSaturne = new THREE.Mesh(gRingSaturne, mRingSaturne);

        RingSaturne.rotateX(Math.PI / 2.3)
        Saturne.add(RingSaturne);

        //Uranus
        var AxisUranus = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisUranus);
        axisPlanets.push(AxisUranus);

        var mUranus = new THREE.MeshBasicMaterial({
            map: texture.load('textures/uranusmap.jpg')
        });
        var gUranus = new THREE.SphereGeometry(Math.log10(valeursPlanetes[6]["diametre"]), 360, 360);
        Uranus = new THREE.Mesh(gUranus, mUranus);
        Uranus.geometry.computeVertexNormals(true);
        AxisUranus.add(Uranus);
        Planets.push(Uranus);

        //Neptune
        var AxisNeptune = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisNeptune);
        axisPlanets.push(AxisNeptune);

        var mNeptune = new THREE.MeshBasicMaterial({
            map: texture.load('textures/neptunemap.jpg')
        });
        var gNeptune = new THREE.SphereGeometry(Math.log10(valeursPlanetes[7]["diametre"]), 360, 360);
        Neptune = new THREE.Mesh(gNeptune, mNeptune);
        Neptune.geometry.computeVertexNormals(true);
        AxisNeptune.add(Neptune);
        Planets.push(Neptune);

        //Lune
        var AxisLune = new THREE.Points(gAxis, mAxis);
        AxisTerre.add(AxisLune);

        var mLune = new THREE.MeshBasicMaterial({
            map: texture.load('textures/moonmap1k.jpg'),

        });
        mLune.bumpMap = texture.load('textures/moonbump1k.jpg')
        var gLune = new THREE.SphereGeometry(2, 16, 16);
        Lune = new THREE.Mesh(gLune, mLune);
        AxisLune.add(Lune);
        scene.add(Soleil);

        //Deimos
        var AxisDeimos = new THREE.Points(gAxis, mAxis);
        AxisMars.add(AxisDeimos);

        var deimos;
        gltfLoader.load('./models/Deimos.glb', function(gltf) {
            deimos = gltf.scene.children[0];
            deimos.scale.set(0.05, 0.05, 0.05);
            deimos.material = new THREE.MeshBasicMaterial({
                map: texture.load('textures/deimosbump.jpg')
            });
            AxisDeimos.add(deimos);
        }, );

        //Phobos
        var AxisPhobos = new THREE.Points(gAxis, mAxis);
        AxisMars.add(AxisPhobos);

        var phobos;
        gltfLoader.load('./models/Phobos.glb', function(gltf) {
            phobos = gltf.scene.children[0];
            phobos.scale.set(0.05, 0.05, 0.05);
            phobos.material = new THREE.MeshBasicMaterial({
                map: texture.load('textures/phobosbump.jpg')
            });
            AxisPhobos.add(phobos);
        }, );


        var clock = new Date().getTime();
        camera.lookAt(Uranus.position);

        function animate() {
            then = (clock) / 3600000000000
            i = 0
            axisPlanets.forEach(axisPlanet => {
                if (valeursPlanetes[i]["position"] != "3.5") {
                    axisPlanet.position.set(0, 0, 0);
                    axisPlanet.translateX(valeursPlanetes[i]["distance"]);
                    axisPlanet.rotateY(((Math.PI * 2) / valeursPlanetes[i]["period"]) * (then / 24));
                }
                i++;
            });

            j = 0
            Planets.forEach(Planet => {
                if (valeursPlanetes[j]["position"] != "3.5") {
                    Planet.position.set(0, 0, 0);
                    Planet.rotateY(((Math.PI * 2) / valeursPlanetes[j]["rotation"]) * then);
                    console.log(((Math.PI * 2) / valeursPlanetes[j]["rotation"]) * then)
                }
                j++;
            });

            Lune.position.set(0, 0, 0);
            Lune.translateX(10);
            Lune.rotateY(-0.02);

            if (phobos) {
                AxisPhobos.position.set(0, 0, 0);
                AxisPhobos.translateX(6);
                AxisPhobos.rotateY(0.01);
                phobos.rotateY(0.04);
            }
            if (deimos) {
                AxisDeimos.position.set(0, 0, 0);
                AxisDeimos.translateX(-6);
                AxisDeimos.rotateY(0.01);
                deimos.rotateY(0.04);
            }

            RingSaturne.rotateZ(0.02);

            //controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    });