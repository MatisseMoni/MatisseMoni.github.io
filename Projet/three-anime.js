const gltfLoader = new THREE.GLTFLoader();
const texture = new THREE.TextureLoader()

//values Planetes
var valeursPlanetes;
var slider = document.getElementById("myRange");
var focusOn = -1;

ROTATION_DELTA = 1;
slider.oninput = function() {
    ROTATION_DELTA = Math.pow(10, this.value);
}

function calcPosFromLatLonRad(lat, lon, radius) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);
    x = -((radius) * Math.sin(phi) * Math.cos(theta));
    z = ((radius) * Math.sin(phi) * Math.sin(theta));
    y = ((radius) * Math.cos(phi)); //from  w ww.  d  em  o  2  s.c  o m
    return [x, y, z];
}


fetch("./valeurs.json")
    .then(response => {
        return response.json();
    }).then(valeursPlanetes => {
        //long/lat to x/y


        valeursPlanetes = valeursPlanetes["Planetes"]
            //scene
        const scene = new THREE.Scene();
        scene.background = texture.load('textures/univers.jpg')
            //camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        camera.position.y = 60 + Math.log10(valeursPlanetes[8]["diametre"]);
        camera.position.x = 200 + Math.log10(valeursPlanetes[8]["diametre"]);

        //renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //OrbitControls
        controls = new THREE.OrbitControls(camera, renderer.domElement);

        //light
        const light2 = new THREE.PointLight( 0x404040, 5, valeursPlanetes[7]["distance"]+valeursPlanetes[7]["diametre"]);
        light2.intensity = 0;
        const light1 = new THREE.AmbientLight(0xffffff); // soft white light
        scene.add(light1);
        scene.add(light2);

        //System Solaire
        var Planets = [];
        var axisPlanets = [];

        //Axis
        var gAxis = new THREE.SphereGeometry(0, 0, 0);
        var mAxis = new THREE.PointsMaterial({ size: 1, sizeAttenuation: false });

        //Soleil
        const sphere = new THREE.SphereGeometry(0.5, 16, 8);

        //lights
        //light1 = new THREE.PointLight( 0xff0040, 2, 50 );
        
        var mSoleil = new THREE.MeshBasicMaterial({
            map: texture.load("textures/sunmap.jpg")
        });
        var gSoleil = new THREE.SphereGeometry(Math.log10(valeursPlanetes[8]["diametre"]), 360, 360);
        Soleil = new THREE.Mesh(gSoleil, mSoleil);
        Soleil.geometry.computeVertexNormals(true);
        light2.add(Soleil);

        //Mercure
        var AxisMercure = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMercure);
        axisPlanets.push(AxisMercure);

        var mMercure = new THREE.MeshPhongMaterial({
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

        var mVenus = new THREE.MeshPhongMaterial({
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

        var mTerre = new THREE.MeshPhongMaterial({
            map: texture.load('textures/earthmap1k.jpg')
        });
        mTerre.bumpMap = texture.load('textures/earthbump1k.jpg');
        mTerre.specularMap = texture.load('textures/earthspec1k.jpg');
        mTerre.specular = new THREE.Color('grey');
        mTerre.bumpScale = 0.05;
        var gTerre = new THREE.SphereGeometry(Math.log10(valeursPlanetes[2]["diametre"]), 64, 64);
        Terre = new THREE.Mesh(gTerre, mTerre);
        Terre.geometry.computeVertexNormals(true);
        AxisTerre.add(Terre);
        Planets.push(Terre);

        //Mars
        var AxisMars = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisMars);
        axisPlanets.push(AxisMars);

        var mMars = new THREE.MeshPhongMaterial({
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


        var mJupiter = new THREE.MeshPhongMaterial({
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


        var mSaturne = new THREE.MeshPhongMaterial({
            map: texture.load('textures/saturnmap.jpg')
        });
        var gSaturne = new THREE.SphereGeometry(Math.log10(valeursPlanetes[5]["diametre"]), 360, 360);
        Saturne = new THREE.Mesh(gSaturne, mSaturne);
        Saturne.geometry.computeVertexNormals(true);
        AxisSaturne.add(Saturne);
        Planets.push(Saturne);

        //Saturne Ring
        var gRingSaturne = new THREE.RingBufferGeometry(Math.log10(valeursPlanetes[5]["diametre"]) + 1, Math.log10(valeursPlanetes[5]["diametre"]) + 3, 360);
        var pos = gRingSaturne.attributes.position;
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            gRingSaturne.attributes.uv.setXY(i, v3.length() < Math.log10(valeursPlanetes[5]["diametre"]) + 1 + 3 / 2 ? 0 : 1, 1);
        }
        var mRingSaturne = new THREE.MeshPhongMaterial({
            map: texture.load('textures/saturnringcolor.png'),
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true
        });
        mRingSaturne.bumpMap = texture.load('textures/saturnringpattern.gif')
        var RingSaturne = new THREE.Mesh(gRingSaturne, mRingSaturne);
        RingSaturne.rotateX(Math.PI / 2.3)
        AxisSaturne.add(RingSaturne);

        //Uranus
        var AxisUranus = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisUranus);
        axisPlanets.push(AxisUranus);

        var mUranus = new THREE.MeshPhongMaterial({
            map: texture.load('textures/uranusmap.jpg')
        });
        var gUranus = new THREE.SphereGeometry(Math.log10(valeursPlanetes[6]["diametre"]), 360, 360);
        Uranus = new THREE.Mesh(gUranus, mUranus);
        Uranus.geometry.computeVertexNormals(true);
        AxisUranus.add(Uranus);
        Planets.push(Uranus);

        //Uranus Ring
        var gRingUranus = new THREE.RingBufferGeometry(Math.log10(valeursPlanetes[6]["diametre"]) + 1, Math.log10(valeursPlanetes[5]["diametre"]) + 3, 360);
        var pos = gRingUranus.attributes.position;
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            gRingUranus.attributes.uv.setXY(i, v3.length() < Math.log10(valeursPlanetes[6]["diametre"]) + 1 + 3 / 2 ? 0 : 1, 1);
        }
        var mRingUranus = new THREE.MeshPhongMaterial({
            map: texture.load('textures/uranusringcolor.png'),
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true
        });
        mRingUranus.bumpMap = texture.load('textures/uranusringtrans.gif')
        var RingUranus = new THREE.Mesh(gRingUranus, mRingUranus);
        RingUranus.rotateX(Math.PI / 2.2)
        AxisUranus.add(RingUranus);

        //Neptune
        var AxisNeptune = new THREE.Points(gAxis, mAxis);
        Soleil.add(AxisNeptune);
        axisPlanets.push(AxisNeptune);

        var mNeptune = new THREE.MeshPhongMaterial({
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

        var mLune = new THREE.MeshPhongMaterial({
            map: texture.load('textures/moonmap1k.jpg'),
        });
        mLune.bumpMap = texture.load('textures/moonbump1k.jpg');
        var gLune = new THREE.SphereGeometry(Math.log10(valeursPlanetes[2]["diametre"]) * (valeursPlanetes[9]["diametre"] / valeursPlanetes[2]["diametre"]), 360, 360);
        Lune = new THREE.Mesh(gLune, mLune);
        AxisLune.add(Lune);
        scene.add(Soleil);


        var mMarker = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        var gMarker = new THREE.SphereGeometry(0.05, 360, 360);
        Marker = new THREE.Mesh(gMarker, mMarker);

        function getPosition() {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                var crd = pos.coords;
                pos = calcPosFromLatLonRad(crd.latitude, crd.longitude, Math.log10(valeursPlanetes[2]["diametre"]))
                Marker.position.set(pos[0], pos[1], pos[2]);
                Terre.add(Marker)
            }

            function error(err) {
                console.warn(`ERREUR (${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        }
        getPosition()
            /* initialize rotation */
        axisPlanets.forEach(axisPlanet => {
            axisPlanet.rotation.y = Math.PI / Math.random();
        });
        Planets.forEach(Planet => {
            Planet.rotation.y = Math.PI / Math.random();
        });


        var v = new THREE.Vector3();
        controls.enablePan = true;
        var firstTime

        function animate() {

            i = 0
            axisPlanets.forEach(axisPlanet => {
                if (valeursPlanetes[i]["position"] != "3.5") {
                    axisPlanet.position.set(0, 0, 0);
                    axisPlanet.translateX(valeursPlanetes[i]["distance"]);
                    axisPlanet.rotateY((Math.PI * 2) / (valeursPlanetes[i]["period"] * 3600000 * 24) * ROTATION_DELTA);
                }
                i++;
            });

            j = 0
            Planets.forEach(Planet => {
                if (valeursPlanetes[j]["position"] != "3.5") {
                    Planet.position.set(0, 0, 0);
                    Planet.rotateY((Math.PI * 2) / (valeursPlanetes[j]["rotation"] * 3600000) * ROTATION_DELTA);
                    Planet.name = valeursPlanetes[j]["name"]
                }
                if (focusOn == j) {
                    controlsTarget(Planet)
                    calculeDistance(Planet)
                }
                j++;
            });
            Soleil.name = valeursPlanetes[8]["name"]
            AxisLune.position.set(0, 0, 0);
            AxisLune.translateX(Math.log10(valeursPlanetes[2]["diametre"]) * (valeursPlanetes[9]["diametre"] / valeursPlanetes[2]["diametre"] + Math.log10(valeursPlanetes[2]["diametre"]) + 1));
            AxisLune.rotateY((Math.PI * 2) / (valeursPlanetes[9]["period"] * 3600000 * 24) * ROTATION_DELTA);
            Lune.position.set(0, 0, 0);
            Lune.rotateY((Math.PI * 2) / (valeursPlanetes[9]["rotation"] * 3600000) * ROTATION_DELTA);
            Lune.name = valeursPlanetes[9]["name"]

            if (focusOn == 8) {
                controlsTarget(Soleil)
                calculeDistance(Soleil)
            } else if (focusOn == 9) {
                controlsTarget(Lune)
                calculeDistance(Lune)
            }

            RingSaturne.rotateZ(((Math.PI * 2) / 0.01 * 3600000) * ROTATION_DELTA);
            RingUranus.rotateZ(((Math.PI * 2) / 0.3 * 3600000) * ROTATION_DELTA);

            controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        $("#recentrer").click(function() {
            firstTime = true;
        })

        $("#target-zoom").on("change", function() {
            focusOn = this.value;
            firstTime = true;
        });

        $("#checkbox").change(function() {
            if (this.checked) {
                scene.add(light1);
                light2.intensity = 0;
            } else {
                light2.intensity = 5;
                light1.removeFromParent()
            }
        })

        function calculeDistance(obj) {
            var p = new THREE.Vector3();
            var a = new THREE.Vector3();

            p.copy(obj.position);
            obj.localToWorld(p);
            Soleil.worldToLocal(p);

            a.copy(Marker.position);
            Marker.localToWorld(a);
            Soleil.worldToLocal(a);


            res = Math.sqrt(Math.pow(a.x - p.x, 2) + Math.pow(a.y - p.y, 2) + Math.pow(a.z - p.z, 2)) * Math.pow(10, 6)
            $("#nomPlanete").text(obj.name)
            $("#distanceContener").show();
            if (obj.name == "Terre") {
                $("#resultaDistance").text("0km")
            } 
            else {
                $("#resultaDistance").text(Math.abs(Math.round(res)) + "km")
            }
        }

        function controlsTarget(obj) {
            v.copy(obj.position);
            obj.localToWorld(v);
            Soleil.worldToLocal(v);
            camera.lookAt(v);
            if (firstTime) {
                controls.target = v;
                camera.position.set(v.x, Math.log10(valeursPlanetes[focusOn]["diametre"]) * 30 / Math.log10(valeursPlanetes[8]["diametre"]) + Math.log10(valeursPlanetes[focusOn]["diametre"]), v.z);
                firstTime = false
            }
        }
    });