
	var audioFiles = ['Open the drawer with the green light', 'Take out the shirt', 'Open the shirt', 'Turn the shirt around', 'Push your arm through the opening hole on one side', 'Now put your other arm through the opening hole on the other side', 'Bring the sides of the shirt together in front of you', 'Line up the buttons with the button holes', 'Push the buttons through the holes', 'Open the drawer with the green light', 'Take out the pants', 'Hold the pants in front of your legs', 'Turn the pants around', 'Sit on the chair', 'Put one leg in the pant', 'Put your other leg in the pant', 'Pull the pants up so you see your feet', 'Stand up', 'Zip up the pants', 'Button the pants', 'Open the drawer with the green light', 'Take out the socks', 'Sit on the chair', 'Put on the socks', 'Open the drawer with the green light', 'Take out the shoes', 'Sit on the chair', 'Put on the shoes', 'Open the drawer with the green light', 'Take out the glasses', 'Put on the glasses', 'Take off your pajamas', 'Take out the underwear', 'Put on the underwear']
	var socket = io()
	socket.on("connect",function(){
		socket.on("play",function(data){
			if(data.data==1){
				var audio = new Audio(`/audio/Shirt/1.mp3`);
				audio.play()
			}else if(data.data==2){
				var audio = new Audio(`/audio/Shirt/2.mp3`);
				audio.play()
			}else if(data.data==3){
				var audio = new Audio(`/audio/Shirt/3.mp3`);
				audio.play()
			}else if(data.data==4){
				var audio = new Audio(`/audio/Shirt/4.mp3`);
				audio.play()
			}else if(data.data==5){
				var audio = new Audio(`/audio/Shirt/5.mp3`);
				audio.play()
			}else if(data.data==6){
				var audio = new Audio(`/audio/Shirt/6.mp3`);
				audio.play()
			}else if(data.data==7){
				var audio = new Audio(`/audio/Shirt/7.mp3`);
				audio.play()
			}else if(data.data==8){
				var audio = new Audio(`/audio/Shirt/8.mp3`);
				audio.play()
			}

			else if(data.data==10){
				var audio = new Audio(`/audio/Pants/1.mp3`);
				audio.play()
			}else if(data.data==11){
				var audio = new Audio(`/audio/Pants/2.mp3`);
				audio.play()
			}
			else if(data.data==12){
				var audio = new Audio(`/audio/Pants/3.mp3`);
				audio.play()
			}
			else if(data.data==13){
				var audio = new Audio(`/audio/Pants/4.mp3`);
				audio.play()
			}
			else if(data.data==14){
				var audio = new Audio(`/audio/Pants/5.mp3`);
				audio.play()
			}
			else if(data.data==15){
				var audio = new Audio(`/audio/Pants/6.mp3`);
				audio.play()
			}
			else if(data.data==16){
				var audio = new Audio(`/audio/Pants/7.mp3`);
				audio.play()
			}
			else if(data.data==17){
				var audio = new Audio(`/audio/Pants/8.mp3`);
				audio.play()
			}else if(data.data==18){
				var audio = new Audio(`/audio/Pants/9.mp3`);
				audio.play()
			}else if(data.data==18){
				var audio = new Audio(`/audio/Pants/9.mp3`);
				audio.play()
			}else if(data.data==19){
				var audio = new Audio(`/audio/Pants/10.mp3`);
				audio.play()
			}else if (data.data==21){
				var audio = new Audio(`/audio/Socks/1.mp3`);
				audio.play()
			}else if(data.data==23){
				var audio = new Audio(`/audio/Socks/2.mp3`);
				audio.play()
			}else if (data.data==25){
				var audio = new Audio(`/audio/Shoes/1.mp3`);
				audio.play()
			}else if(data.data==27){
				var audio = new Audio(`/audio/Shoes/2.mp3`);
				audio.play()
			}else if(data.data==29){
				var audio = new Audio(`/audio/Other/29.mp3`);
				audio.play()
			}else if(data.data==30){
				var audio = new Audio(`/audio/Other/30.mp3`);
				audio.play()
			}else if(data.data==31){
				var audio = new Audio(`/audio/Other/31.mp3`);
				audio.play()
			}else if(data.data==32){
				var audio = new Audio(`/audio/Other/32.mp3`);
				audio.play()
			}else if(data.data==33){
				var audio = new Audio(`/audio/Other/33.mp3`);
				audio.play()
			}else if (data.data == 28 || data.data == 0 || data.data == 9 ||data.data == 20 || data.data ==24){
				var audio = new Audio(`/audio/Other/OpenTheDrawer.mp3`);
				audio.play()
			}else if(data.data==26){
				var audio = new Audio(`/audio/Pants/4.mp3`);
				audio.play()
			}else if(data.data==22){
				var audio = new Audio(`/audio/Pants/4.mp3`);
				audio.play()
			}
		})
	})
