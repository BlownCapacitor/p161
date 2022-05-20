AFRAME.registerComponent("ball", {
    init: function () {
        this.roll();
    },
    roll: function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry", {
                    primitive: "sphere",
                    radius: 0.3
                })
                ball.setAttribute("material", "color", "blue")
                var cam = document.querySelector("#camera");
                pos = cam.getAttribute("position");
                ball.setAttribute("position", {
                    x: pos.x, y: pos.y, z: pos.z

                })
                var cam2 = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                cam2.getWorldDirection(direction)
                ball.setAttribute("velocity", direction.multiplyScalar(-5))
                console.log(direction)
                var scene = document.querySelector("#scene");
                
                scene.appendChild(ball)
            }
        })
    }


})