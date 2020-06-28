`timescale 1ns / 1ps


module main(
    input inmes1,
	 input inmes2,
	 input inmes3,
	 input inmes4,
	 input  inest0,
	 input  inest1,
	 input  inest2,
	 input clk,
    output reg M1L =0,
    output reg M1R =0,
    output reg M1O =0,
    output reg M2L =0,
    output reg M2R =0,
    output reg M2O =0,
    output reg M3L =0,
    output reg M3R =0,
    output reg M3O =0,
    output reg M4L =0,
    output reg M4R =0,
    output reg M4O =0
    );
reg M1Lant;
reg M1Rant;
reg M1Oant;
reg M2Lant;
reg M2Rant;
reg M2Oant;
reg M3Lant;
reg M3Rant;
reg M3Oant;
reg M4Lant;
reg M4Rant;
reg M4Oant;

always @(clk) begin
	M1Lant=M1L;
	M1Rant=M1R;
	M1Oant=M1O;
	M2Lant=M2L;
	M2Rant=M2R;
	M2Oant=M2O;
	M3Lant=M3L;
	M3Rant=M3R;
	M3Oant=M3O;
	M4Lant=M4L;
	M4Rant=M4R;
	M4Oant=M4O;
	if(inmes1==1)begin
		if(inest0==1) begin
			M1L=1;
			M1O=0;
			M1R=0;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M1Lant=M1L;
			M1Rant=M1R;
			M1Oant=M1O;
		end else if(inest1==1) begin
			M1L=0;
			M1O=1;
			M1R=0;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M1Lant=M1L;
			M1Rant=M1R;
			M1Oant=M1O;
		end else if(inest2==1) begin
			M1L=0;
			M1O=0;
			M1R=1;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M1Lant=M1L;
			M1Rant=M1R;
			M1Oant=M1O;
		end
		
	end else if(inmes2==1)begin
		if(inest0==1) begin
			M2L=1;
			M2O=0;
			M2R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M2Lant=M2L;
			M2Rant=M2R;
			M2Oant=M2O;
		end else if(inest1==1) begin
			M2L=0;
			M2O=1;
			M2R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M2Lant=M2L;
			M2Rant=M2R;
			M2Oant=M2O;
		end else if(inest2==1) begin
			M2L=0;
			M2O=0;
			M2R=1;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M2Lant=M2L;
			M2Rant=M2R;
			M2Oant=M2O;
		end
		
	end else if(inmes3==1)begin
		if(inest0==1) begin
			M3L=1;
			M3O=0;
			M3R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M3Lant=M3L;
			M3Rant=M3R;
			M3Oant=M3O;
		end else if(inest1==1) begin
			M3L=0;
			M3O=1;
			M3R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M3Lant=M3L;
			M3Rant=M3R;
			M3Oant=M3O;
		end else if(inest2==1) begin
			M3L=0;
			M3O=0;
			M3R=1;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M4L=M4Lant;
			M4R=M4Rant;
			M4O=M4Oant;
			M3Lant=M3L;
			M3Rant=M3R;
			M3Oant=M3O;
		end
		
	end else if(inmes4==1)begin
		if(inest0==1) begin
			M4L=1;
			M4O=0;
			M4R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4Lant=M4L;
			M4Rant=M4R;
			M4Oant=M4O;
		end else if(inest1==1) begin
			M4L=0;
			M4O=1;
			M4R=0;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4Lant=M4L;
			M4Rant=M4R;
			M4Oant=M4O;
		end else if(inest2==1) begin
			M4L=0;
			M4O=0;
			M4R=1;
			M1L=M1Lant;
			M1R=M1Rant;
			M1O=M1Oant;
			M2L=M2Lant;
			M2R=M2Rant;
			M2O=M2Oant;
			M3L=M3Lant;
			M3R=M3Rant;
			M3O=M3Oant;
			M4Lant=M4L;
			M4Rant=M4R;
			M4Oant=M4O;
		end else begin 
			M1Lant=M1L;
			M1Rant=M1R;
			M1Oant=M1O;
			M2Lant=M2L;
			M2Rant=M2R;
			M2Oant=M2O;
			M3Lant=M3L;
			M3Rant=M3R;
			M3Oant=M3O;
			M4Lant=M4L;
			M4Rant=M4R;
			M4Oant=M4O;
		
		
		
		end
		
	end 
	

end

endmodule
