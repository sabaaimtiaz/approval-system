// import { Entity ,PrimaryGeneratedColumn,Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
// //import { Post } from "@nestjs/common";
// import { Post } from "./Post";
// import { Profile } from "./Profile";

// //entities represant database table and maps to databpase table
// @Entity({name:'login'}) //entity marked the userclass as an entity and mapped it to the database tablenamed= user
// export class Login{

//     @PrimaryGeneratedColumn( {type:'bigint'}) //ID unique and autogenerated
//   id: number;

//   @Column({unique:true})  //mapped to the column in sql table
//   username: string;

//   @Column()
//   password: string;

//   @Column()
//   email: string;

//   // @Column( )
//   // CreatedAt: Date;

//   // @Column({nullable:true})
//   // AuthStrategy:string;


// // @OneToOne(()=>Profile,profile => profile.user)
// // @JoinColumn()
// // profile:Profile;

// // @OneToMany(() => Post, post => post.user)
// // posts: Post[];


// }
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { UserRole } from './LoginEnums';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User, 
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}











